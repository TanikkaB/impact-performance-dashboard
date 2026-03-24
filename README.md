# 📊 Impact Performance Dashboard

A lightweight analytics dashboard designed to help impact and programme teams monitor performance, understand outcomes, and identify risks across programmes, regions, and time.

This project is part of the **Impact Analytics Suite**, a portfolio of decision-support tools focused on impact, programme, and data strategy workflows.

---

## 🎯 Overview

Impact teams often need a quick, structured way to understand what is happening across programmes, regions, and time periods without rebuilding reports manually.

This dashboard brings key performance indicators together into a simple interface that supports:

- programme monitoring  
- outcome tracking  
- performance comparison  
- early risk identification  
- decision-ready reporting  

---

## ✨ Key Features

- KPI summary cards for quick performance overview  
- Interactive filtering by programme, region, and date  
- Completion and outcome comparisons across programmes  
- Time-based trend visualisation  
- Automated key findings and insights  
- Risk flagging for underperforming areas  
- Optional survey feedback analysis (word frequency + keyword detection)

---

## ✨ What It Does

The dashboard allows users to upload a CSV dataset and explore:

- Total participants  
- Completion rate  
- Average score improvement  
- Average satisfaction score  
- Participation by region  
- Completion by programme  
- Outcome trends over time  
- Automatically generated key findings  
- Areas to investigate based on simple flagging rules  

It also includes a sample dataset so users can explore the app immediately.

---

## 🧭 Why I Built It

I built this project to demonstrate how data can be used not just to report what has happened, but to support structured decision-making in impact-driven environments.

The goal was to create a lightweight, practical tool that reflects how impact and programme teams actually work — balancing clarity, usability, and insight.

---

## 👥 Example Use Case

This tool could be used by:

- Impact teams monitoring delivery across multiple programmes  
- Programme managers tracking participant outcomes  
- Strategy teams reviewing performance trends across regions  
- Organisations preparing internal or external reporting summaries  

---

## 🗂 Expected Data Structure

The app is designed to work with columns such as:

- `participant_id`
- `programme`
- `region`
- `start_date`
- `completed`
- `pre_score`
- `post_score`
- `satisfaction_score`
- `survey_comment` *(optional, for lightweight text analysis)*

---

## 🧪 Demo Mode

A built-in demo dataset is included so the dashboard can be explored without uploading a file.

Demo mode is designed to show:

- realistic KPI variation  
- clear programme differences  
- regional trends  
- at least one underperforming area for flagging  
- optional feedback analysis when survey comments are included  

---

## 📸 Screenshots

### Landing Page
_Add screenshot here_

### Dashboard View
_Add screenshot here_

### Demo / Insights View
_Add screenshot here_

---

## 🛠 Tech Stack

- Python  
- Pandas  
- Streamlit  
- Data visualisation  
- Lightweight rule-based insight generation  

---

## 🚀 Live Demo

[Coming soon]

---

## 📁 Repository

[Add repository link here]

---

## 📌 Notes

- This project is part of a portfolio demonstrating analytical tooling and decision-support workflows.  
- Demo data is synthetic and included for illustration purposes.  
- The dashboard is intentionally lightweight and designed for clarity over complexity.  

---

## 🔗 Related Project

Part of the **Impact Analytics Suite**  
[Add suite repo link here]

This project focuses on clarity, usability, and decision support rather than model complexity.

---

## ⚙️ How to Run Locally

```bash
git clone https://github.com/YOUR-USERNAME/impact-performance-dashboard.git
cd impact-performance-dashboard
pip install -r requirements.txt
streamlit run app.py
