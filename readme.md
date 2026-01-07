## <h1>📚 Book Store (MERN Stack Developer Assessment) </h1>

A simple **Book Store web application** built with **Render** and deployed on **Vercel**.  
This project demonstrates how to build and deploy a Rust-powered backend/frontend app on Verce

## 🛠️ Tech Stack

- 💻 **Render** – backend logic & API
- 🚀 **Vercel** – deployment platform
- (Optionally list frontend framework if used, e.g., Yew, Leptos, or WASM)

# 🚀 Live Demo

👉 https://book-store-two-rust.vercel.app

## 🧰 Tech Stack (MERN)

This project is built using the MERN Stack, a popular full-stack JavaScript technology.

# 🔹 Frontend

- React.js – User Interface

- HTML5 & TCSS & DaisyUI – Layout & styling

- JavaScript (ES6+) – Client-side logic

# 🔹 Backend

- Node.js – Server environment

- Express.js – REST API development

# 🔹 Database

- MongoDB – NoSQL database for storing book data

# 🔹 Deployment

Vercel + Render – Hosting and deployment platform

## 🧠 MERN Architecture Overview

- React handles the user interface

- Express & Node.js manage the server and APIs

- MongoDB stores books and application data

- Vercel + Render handles CI/CD and live deployment

## 📌 Features

## 🧑‍💻 User Features

- 📚 Browse Books

Users can view all available books on the homepage.

- 🔍 View Book Details

Each book displays essential information such as title, author, and description.

- 🛒 Easy Navigation

Clean UI for smooth browsing experience.

- ⚡ Fast Performance

Optimized for quick loading and responsiveness.

- 🌐 Accessible Online

Users can access the store anytime via the live link.

## 🔐 Admin Panel

The Admin Panel is designed to manage the book store efficiently.
Only authorized admins can access this section.

## 👤 Admin Features

- ➕ Add New Books

Admin can add new books with details like title, author, price, and description.

- ✏️ Update Book Details

Edit existing book information anytime.

- ❌ Delete Books

Remove books that are out of stock or no longer available.

- 📋 View All Books

See the complete list of books in one place.

- 🔒 Secure Access

Admin functionalities are restricted from normal users.

## 🧑‍💼 Admin Responsibilities

- Maintain accurate book data

- Ensure availability and correctness of listings

- Manage the overall content of the store

## ⚙️ Admin Workflow

- Admin logs in to the admin panel

- Navigates to the dashboard

- Performs CRUD operations (Create, Read, Update, Delete) on books

- Changes are reflected immediately on the user side

## 🔮 Future Enhancements (Admin)

- 🔐 Admin authentication & role-based access

- 📊 Dashboard analytics (total books, sales, users)

- 🧾 Order management

- 👥 User management

## 🔄 Admin & User Flow (MERN Architecture)

This project follows a clear separation of concerns between Admin and User roles using the MERN stack.

## 👤 User Flow (Client Side)

## 🧑‍💻 User Journey

React frontend fetches book data from backend APIs

- User can:

- Browse all available books

- View book details

- Navigate smoothly across pages

- Backend (Node + Express) handles requests and fetches data from MongoDB

- Data is returned as JSON and rendered dynamically in the UI

## 🔁 User Flow Diagram (Text)

User
↓
React UI
↓
Express API
↓
MongoDB
↓
Express API
↓
React UI

🔐 Admin Flow (Management Side)
🧑‍💼 Admin Journey

Admin logs in to the Admin Panel

Admin dashboard is loaded (React)

Admin can perform CRUD operations:

➕ Add new books

✏️ Update book details

❌ Delete books

📋 View all books

- Each admin action:

- Sends request to Express API

- API validates request

- MongoDB is updated accordingly

- Updated data is reflected instantly on the User side

## 🔁 Admin Flow Diagram (Text)

Admin
↓
Admin Dashboard (React)
↓
Express API (Protected Routes)
↓
MongoDB

## 🛡 Role-Based Access Control (RBAC)

## 👤 Users

- Read-only access

- Can view books only

## 🔐 Admin

- Full access (Create, Read, Update, Delete)

- Restricted routes handled via backend middleware

## ⚙️ API Responsibility

| Role  | API Access | Description           |
| ----- | ---------- | --------------------- |
| User  | GET        | Fetch books & details |
| Admin | POST       | Add new books         |
| Admin | PUT        | Update book data      |
| Admin | DELETE     | Remove books          |

## 🧠 MERN Flow Summary

- React → UI & user interactions

- Express → REST APIs & routing

- Node.js → Server environment

- MongoDB → Persistent data storage

This separation ensures scalability, security, and maintainability.

## 🔮 Future Improvements (Flow Level)

- JWT-based authentication

- Separate Admin & User dashboards

- User accounts & order history

- Admin analytics panel

## 🔧 Installation (Run Locally)

1. **Clone the repo**

   ```bash
   git clone [paste-the-git-repository-link-here]

   cd [put-the-repository-name-here]

   ```

2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Client run command**

   ```bash
   npm run build

   ```

4. **Open in browser**
   http://localhost:3000

5. **Server run command**
   ```bash
    npm run dev
   ```
