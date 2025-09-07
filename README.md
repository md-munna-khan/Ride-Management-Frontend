# 🚖 Ride Booking & Management System (Frontend)

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://ride-management-system-frontend-one.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend-API-green)](https://assigment-b5-a5-munna.vercel.app)

A **production-grade ride booking platform** (similar to Uber/Pathao) built with **React.js, Redux Toolkit, and RTK Query**.  
The platform provides **role-based dashboards** for Riders, Drivers, and Admins with real-time ride management, analytics, and earnings features.

---

## 🌍 Live Deployment
- **Frontend**: [Live App](https://ride-management-system-frontend-one.vercel.app)  
- **Backend API**: [API Server](https://assigment-b5-a5-munna.vercel.app)  
- **Frontend Repo**: [GitHub Link](https://github.com/md-munna-khan/Ride-Management-Frontend)  
- **Backend Repo**: [GitHub Link](https://github.com/md-munna-khan/B5A5-BACKEND)  

---

## 📖 Project Overview
This is a **full-stack MERN project** frontend that enables users to book rides, manage ride requests, and oversee tasks depending on their role (**Rider, Driver, or Admin**).  
The frontend is powered by **React + Redux Toolkit + RTK Query**, ensuring **seamless API integration, global state management, and smooth UI/UX**.  

The project emphasizes:
- **Scalability** → modular codebase, reusable components.  
- **Security** → JWT authentication, role-based access, form validation.  
- **Performance** → API caching, pagination, optimized queries.  

---

## ✨ Key Features

### 🔑 Authentication & Authorization
- Google OAuth + JWT authentication with refresh tokens
- Role-based route protection (`Rider`, `Driver`, `Admin`)
- Blocked/Suspended users redirected to `Unauthorized` page
- Persistent login using `localStorage`

### 🧑‍🤝‍🧑 Rider Features
- Request rides (pickup, destination, fare estimate)
- Real-time ride tracking
- Ride history with pagination & filters (status/date/fare)
- Profile management (update info, change password)
- Cancel ride before driver accepts

### 🚗 Driver Features
- Go **Online/Offline** to accept rides
- Accept/Reject rider requests
- Update ride status (`Pickup → In Transit → Completed → Cancelled`)
- Earnings dashboard with daily/weekly/monthly charts
- Vehicle info & profile update
- Location sharing

### 🛠 Admin Features
- Manage users (approve, suspend, block/unblock)
- Approve driver verification requests
- View all rides with filters
- Analytics dashboard with:
  - Active vs Completed rides
  - Total revenue trends
  - Top performing drivers
- Manage system-wide settings

### 🌐 General Features
- Fully responsive UI (mobile-first with Tailwind)
- Dark/Light mode toggle
- Role-based dynamic navigation bar + dropdown menus
- Form validation with **Zod / Yup**
- Toast & modal notifications
- Emergency SOS button (for safety)

---

## 🛠️ Technology Stack

### Frontend
- ⚛️ React.js (with React Router DOM v6)
- 🎯 Redux Toolkit + RTK Query
- 📘 TypeScript
- 🎨 Tailwind CSS + Shadcn/UI
- 📊 Recharts (data visualization)
- 🔔 React Hot Toast (notifications)

### Backend (API)
- 🟢 Node.js + Express
- 🗄 MongoDB + Mongoose
- 🔐 JWT + bcrypt authentication
- 📏 Zod schema validation
- ☁️ Cloudinary (image uploads)

### Deployment
- 🚀 Frontend: Vercel
- ⚙️ Backend: Vercel
- 🗄 Database: MongoDB Atlas

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/md-munna-khan/Ride-Management-Frontend.git
cd Ride-Management-Frontend

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/md-munna-khan/Ride-Management-Frontend.git
cd Ride-Management-Frontend
```
####  Install Dependencies
```bash
npm install
```
#### Setup Environment Variables
```bash
VITE_API_BASE_URL=https://assigment-b5-a5-munna.vercel.app


```
#### Run the Project
```bash
npm run dev
## 📊 API Endpoints (Examples)

### 🧑‍🤝‍🧑 Rider Endpoints
- **POST** `/rides/request` → Request a new ride  
- **GET** `/rides/me` → Get my rides (with filters + pagination)  
- **PATCH** `/rides/:id/status` → Update ride status (cancel/complete/etc.)  

---

### 🚗 Driver Endpoints
- **GET** `/rides/active` → Fetch active rides (available to accept)  
- **PATCH** `/rides/:id/accept` → Accept a ride request  
- **PATCH** `/rides/:id/complete` → Complete an assigned ride  
- **GET** `/rides/earnings/me` → View driver earnings summary  

---

### 🛠 Admin Endpoints
- **GET** `/users/all-users` → Fetch all users (with filters + pagination)  
- **PATCH** `/users/block/:id` → Block/Unblock a user  
- **PATCH** `/drivers/approve/:id` → Approve driver verification request  
- **GET** `/users/admin` → Get admin analytics & dashboard data  
