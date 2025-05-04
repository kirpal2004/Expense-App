💸 Expense Tracker App
A simple and user-friendly Expense Management Web App to track daily spending. Built with React.js for the frontend, PHP & MySQL (XAMPP) for the backend, and Firebase for Google Sign-In.

🚀 Tech Stack
| Frontend | Backend | Database      | Authentication          |
| React.js | PHP     | MySQL (XAMPP) | Firebase Google Sign-In |

✨ Features
🔐 Google Login using Firebase

➕ Add Expenses (Title, Amount, Date)

🧾 View Expense List with dates and amounts

🔍 Search & Sort expenses easily

📅 Filter by specific date or by month

🌗 Dark Mode Toggle

❌ Delete expense entries

🧠 System Architecture – Expense Tracker Web App
                          ┌────────────────────┐
                          │    User (Browser)  │
                          └────────┬───────────┘
                                   │
                                   ▼
                      ┌──────────────────────────┐
                      │     React.js Frontend    │
                      │                          │
                      │ - Displays UI            │
                      │ - Sends form data        │
                      │ - Fetches expense data   │
                      └────────┬─────────────────┘
                               │
                               ▼
                      ┌──────────────────────────┐
                      │     PHP Backend (API)    │
                      │                          │
                      │ - Handles POST/GET/DEL   │
                      │ - Communicates with DB   │
                      └────────┬─────────────────┘
                               │
                               ▼
                  ┌──────────────────────────────┐
                  │       MySQL Database         │
                  │         (XAMPP)              │
                  │ ┌──────────────────────────┐ │
                  │ │  expenses (table)        │ │
                  │ │  - id                    │ │
                  │ │  - title                 │ │
                  │ │  - price                 │ │
                  │ │  - date                  │ │
                  │ └──────────────────────────┘ │
                  └──────────────────────────────┘
                               ▲
                               │
                  ┌──────────────────────────────┐
                  │ Firebase (Google Login Auth) │
                  │ - Provides OAuth tokens      │
                  │ - React uses it for user     │
                  │   authentication             │
                  └──────────────────────────────┘

Key Flows:
✅ Login: User logs in via Google → Firebase Auth → Token saved in frontend.

📤 Add Expense: React sends expense data to PHP via POST.

📥 Get Expense: React fetches expenses via GET from PHP.

🗑️ Delete Expense: React triggers a DELETE request to PHP.

💾 PHP handles DB operations and interacts with the expenses table in MySQL.

🔐 Authentication (Firebase)
Uses Google Sign-In

User's email is stored in MySQL along with expenses

Logout button on dashboard


🖼️ Screenshots
🔐 Login Page

📋 Expense Form + Dashboard

📆 Date & Month Filter
