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

![authentication](https://github.com/user-attachments/assets/0b8cbdcd-2d4e-406d-9684-821ca5eb3e9b)

Lightmode
![lightmode](https://github.com/user-attachments/assets/84fd5373-27a2-4c20-943e-1433014087d0)

Darkmode
![darkmode](https://github.com/user-attachments/assets/c1a7b8ef-8b4d-49fc-b0a3-39616e6afe83)

Dropdown Menu
![dropdown](https://github.com/user-attachments/assets/9d3fa549-fdff-4fb2-b2eb-65ff7bfabb93)

🔐 Login Page

📋 Expense Form + Dashboard

📆 Date & Month Filter
