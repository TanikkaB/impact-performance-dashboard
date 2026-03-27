import { useState, useMemo, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Participant, Filters } from "@/lib/types";
import {
  applyFilters, computeKPIs, participantsByRegion,
  completionByProgramme, improvementByProgramme, monthlyTrend, generateInsights,
} from "@/lib/analytics";
import { generateDemoData } from "@/lib/demo-data";
import { LandingScreen } from "@/components/LandingScreen";
import { CSVUpload } from "@/components/CSVUpload";
import { FilterSidebar } from "@/components/FilterSidebar";
import { KPICards } from "@/components/KPICards";
import {
  ParticipantsByRegion, CompletionByProgramme,
  ImprovementByProgramme, MonthlyTrend,
} from "@/components/Charts";
import { InsightsPanel } from "@/components/InsightsPanel";
import { RiskFlags } from "@/components/RiskFlags";
import { FeedbackInsights } from "@/components/FeedbackInsights";
import { DataTable } from "@/components/DataTable";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { ComparisonMode } from "@/components/ComparisonMode";
import { CohortAnalysis } from "@/components/CohortAnalysis";
import { TrendComparison } from "@/components/TrendComparison";
import { ProgrammeDeepDive } from "@/components/ProgrammeDeepDive";
import { BarChart3, FileDown, GitCompareArrows, Menu, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportDashboardPDF } from "@/lib/pdf-export";
import { exportExecutiveSummary } from "@/lib/executive-summary";
import { useIsMobile } from "@/hooks/use-mobile";

const defaultFilters: Filters = {
  programmes: [],
  regions: [],
  dateRange: [null, null],
  completionStatus: "all",
};

type View = "landing" | "upload" | "dashboard";

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const Index = () => {
  const [view, setView] = useState<View>("landing");
  const [rawData, setRawData] = useState<Participant[]>([]);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [isDemo, setIsDemo] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [drillDown, setDrillDown] = useState<{ type: "region" | "programme"; value: string } | null>(null);
  const [selectedProgramme, setSelectedProgramme] = useState<string | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const programmes = useMemo(() => [...new Set(rawData.map((p) => p.programme))].sort(), [rawData]);
  const regions = useMemo(() => [...new Set(rawData.map((p) => p.region))].sort(), [rawData]);

  const filtered = useMemo(() => applyFilters(rawData, filters), [rawData, filters]);
  const tableData = useMemo(() => {
    if (!drillDown) return filtered;
    return filtered.filter((p) =>
      drillDown.type === "region" ? p.region === drillDown.value : p.programme === drillDown.value
    );
  }, [filtered, drillDown]);
  const kpis = useMemo(() => computeKPIs(filtered), [filtered]);
  const regionChart = useMemo(() => participantsByRegion(filtered), [filtered]);
  const compChart = useMemo(() => completionByProgramme(filtered), [filtered]);
  const impChart = useMemo(() => improvementByProgramme(filtered), [filtered]);
  const trendChart = useMemo(() => monthlyTrend(filtered), [filtered]);
  const insights = useMemo(() => generateInsights(filtered), [filtered]);

  const handleDrillRegion = useCallback((region: string) => {
    setDrillDown((prev) => prev?.type === "region" && prev.value === region ? null : { type: "region", value: region });
  }, []);

  const handleDrillProgramme = useCallback((programme: string) => {
    setSelectedProgramme(programme);
  }, []);

  const handleDataLoaded = (data: Participant[]) => {
    setRawData(data);
    setIsDemo(false);
    setView("dashboard");
  };

  const handleExploreDemo = () => {
    setRawData(generateDemoData());
    setIsDemo(true);
    setView("dashboard");
  };

  const handleReset = () => {
    setRawData([]);
    setFilters(defaultFilters);
    setIsDemo(false);
    setCompareMode(false);
    setView("landing");
  };

  const handleExportPDF = async () => {
    if (!dashboardRef.current) return;
    setExporting(true);
    try {
      await exportDashboardPDF(dashboardRef.current);
    } finally {
      setExporting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {view === "landing" && (
        <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <LandingScreen
            onGetStarted={() => setView("upload")}
            onExploreDemo={handleExploreDemo}
          />
        </motion.div>
      )}

      {view === "upload" && (
        <motion.div key="upload" variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
            <div className="w-full max-w-xl">
              <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Impact Analytics Suite
              </p>
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Impact Performance Dashboard</h1>
                <p className="mt-2 text-sm text-muted-foreground">Upload your programme data to begin monitoring</p>
              </div>
              <CSVUpload onDataLoaded={handleDataLoaded} />
              <button
                onClick={() => setView("landing")}
                className="mt-6 block w-full text-center text-xs text-muted-foreground hover:text-foreground"
              >
                ← Back to welcome
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {view === "dashboard" && (
        <motion.div key="dashboard" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex min-h-screen bg-background">
          {/* Mobile sidebar overlay */}
          {isMobile && sidebarOpen && (
            <div className="fixed inset-0 z-40 flex">
              <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <div className="relative z-50 animate-in slide-in-from-left duration-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="absolute right-2 top-2 z-50 h-7 w-7 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
                <FilterSidebar
                  programmes={programmes}
                  regions={regions}
                  filters={filters}
                  onChange={setFilters}
                />
              </div>
            </div>
          )}

          {/* Desktop sidebar */}
          {!isMobile && (
            <FilterSidebar
              programmes={programmes}
              regions={regions}
              filters={filters}
              onChange={setFilters}
            />
          )}

          <div className="flex-1 overflow-auto">
            <header className="border-b border-border bg-card px-4 py-4 md:px-6 md:py-5">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  {isMobile && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSidebarOpen(true)}
                      className="mb-2 h-8 px-2 text-xs gap-1.5"
                    >
                      <Menu className="h-3.5 w-3.5" />
                      Filters
                    </Button>
                  )}
                  <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Impact Analytics Suite
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-lg font-bold text-foreground md:text-xl">Impact Performance Dashboard</h1>
                    {isDemo && (
                      <span className="rounded-full bg-kpi-blue-bg px-2.5 py-0.5 text-xs font-medium text-kpi-blue">
                        Currently viewing: Sample Data
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {filtered.length} records · {new Set(filtered.map((p) => p.participant_id)).size} unique participants
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant={compareMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCompareMode(!compareMode)}
                    className="h-8 px-3 text-xs gap-1.5"
                  >
                    <GitCompareArrows className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{compareMode ? "Exit Compare" : "Compare"}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportPDF}
                    disabled={exporting}
                    className="h-8 px-3 text-xs gap-1.5"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{exporting ? "Generating…" : "Export PDF"}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportExecutiveSummary(filtered)}
                    className="h-8 px-3 text-xs gap-1.5"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Summary PDF</span>
                  </Button>
                  <DarkModeToggle />
                  <button
                    onClick={handleReset}
                    className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    {isDemo ? "Exit demo" : "New file"}
                  </button>
                </div>
              </div>
            </header>

            <main ref={dashboardRef} className="space-y-6 p-4 md:p-6">
              {compareMode ? (
                <ComparisonMode
                  rawData={rawData}
                  programmes={programmes}
                  regions={regions}
                  onClose={() => setCompareMode(false)}
                />
              ) : selectedProgramme ? (
                <ProgrammeDeepDive
                  data={filtered}
                  programme={selectedProgramme}
                  onBack={() => setSelectedProgramme(null)}
                  isDemo={isDemo}
                />
              ) : (
                <>
                  <KPICards {...kpis} />

                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <ParticipantsByRegion data={regionChart} onBarClick={handleDrillRegion} />
                    <CompletionByProgramme data={compChart} onBarClick={handleDrillProgramme} />
                    <ImprovementByProgramme data={impChart} onBarClick={handleDrillProgramme} />
                    <MonthlyTrend data={trendChart} />
                  </div>

                  {drillDown && (
                    <div className="flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-4 py-2">
                      <span className="text-xs text-foreground">
                        Filtered to <strong>{drillDown.value}</strong> ({drillDown.type})
                      </span>
                      <Button variant="ghost" size="sm" onClick={() => setDrillDown(null)} className="h-6 px-2 text-xs">
                        <X className="h-3 w-3 mr-1" /> Clear
                      </Button>
                    </div>
                  )}

                  <DataTable data={tableData} />

                  <div className="border-t border-border" />

                  <RiskFlags data={filtered} />

                  <div className="border-t border-border" />

                  <FeedbackInsights data={filtered} isDemo={isDemo} />

                  <div className="border-t border-border" />

                  <CohortAnalysis data={filtered} />

                  <div className="border-t border-border" />

                  <TrendComparison data={filtered} />

                  <InsightsPanel insights={insights} />
                </>
              )}
            </main>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
