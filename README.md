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
![Landing Page](Images_Impact_Performance_Tracker/1_Landing.png)

### Dashboard View
![Dashboard View](Images_Impact_Performance_Tracker/2_Dashboard.png)

### Demo / Insights View
![Insights View](Images_Impact_Performance_Tracker/3_Insights.png)

---

## ⚙️ How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/TanikkaB/impact-performance-dashboard.git
```
2. Navigate into the project folder:
```bash
cd impact-performance-dashboard
```
3. Install dependencies:
```bash
pip install -r requirements.txt
```
4. Run the app:
```bash
streamlit run app.py
```
---

## 🛠 Tech Stack

- Python  
- Pandas  
- Streamlit  
- Data visualisation  
- Lightweight rule-based insight generation  

---

## 🚀 Live Demo

[Open the live app](https://id-preview--35a87094-b6b6-4865-9152-bb0f99dc51ba.lovable.app/?__lovable_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWNEUW5KVmlLTFNpNWdNSUliclN0VW1HZVpqMSIsInByb2plY3RfaWQiOiIzNWE4NzA5NC1iNmI2LTQ4NjUtOTE1Mi1iYjBmOTlkYzUxYmEiLCJhY2Nlc3NfdHlwZSI6InByb2plY3QiLCJpc3MiOiJsb3ZhYmxlLWFwaSIsInN1YiI6IjM1YTg3MDk0LWI2YjYtNDg2NS05MTUyLWJiMGY5OWRjNTFiYSIsImF1ZCI6WyJsb3ZhYmxlLWFwcCJdLCJleHAiOjE3NzUxNTExODQsIm5iZiI6MTc3NDU0NjM4NCwiaWF0IjoxNzc0NTQ2Mzg0fQ.lb3FQwCxKBHWAxx_mM3aDNFiBeTdzDF4Hs0t_8nxYeTPp4SbIHKhjOHW59aXraTARwhtuku1Z28ppPxjKF88UkW9EvzMTga1VGy6c5pmw6_-zGvp06bljyvHAnmUlEWAyYWRm3E2RFc5isox04_Ni4u2YUfx2Y4viX56Y3Vlyc9w4JdAmoSrnQypfihuXxXv3gIhgZ6VFQy1czERfxX6k1a-WJcCYElR91UYjfEsXU-FCETIgOBY-0b714UIrOhSRcNdq8uI42Y0Xc2VWN9_sgB-eGXZ2tQvk-kK9ZhwGIK3GKNuoiTlMayGU--H5QXbuWwycHMWRTVUISRjZiar0Td_L69C7JCQlZ9s8s16u-jvpndYrPX33BNbcvaDMt8pKdymw4sEyLDbTRI9Shf1tJitYkJEym-gNHp58LyslDsNp_1SR1N7sskBxbiuv7JF1xwZMLsSJkuU3guB2lK9fvgqP2xSJDishKgn1Y-ZAXgencMCK3k04lM7U2UFpbnCB_CgpyytDWpQgzGxO_ghCZNn3AnUGr7UaxcyRh8yGCAG_EseV22_UkCZpDxqxSXQv1K_gEwATh_zbmJNKsPHZ0MTHeLvEp2Nxczf8LK5q47_1LTZCeQETCR7dGHAWlc0pOlJ8PCaubqOPSoawfUm2rualO9Id82G626aZIY7nuM)

---

## 📁 Repository

https://github.com/TanikkaB/impact-performance-dashboard

---

## 📌 Notes

- This project is part of a portfolio demonstrating analytical tooling and decision-support workflows.  
- Demo data is synthetic and included for illustration purposes.  
- The dashboard is intentionally lightweight and designed for clarity over complexity.  

---

## 🔗 Related Project

Part of the **Impact Analytics Suite**  
[View the full suite](https://github.com/TanikkaB/impact-analytics-suite)

This project focuses on clarity, usability, and decision support rather than model complexity.

---
