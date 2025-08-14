# 🍽️ Restaurant Lists Platform

A professional full-stack app to browse, add, and manage restaurant listings. Built with a Clean Architecture backend and a responsive React frontend.

***

## 📑 Table of Contents

- [Live Demo](#live-demo)
- [Application Preview](#application-preview)
- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Technology Stack \& Architecture](#technology-stack--architecture)
- [Local Setup \& Installation](#local-setup--installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Author](#author)

***

## 🚀 Live Demo

- **URL :** [restaurant-listing-platform-blush.vercel.app](https://restaurant-listing-platform-blush.vercel.app)

***

## 📸 Application Preview

> _screenshot _

***

## 📖 About The Project

**Restaurant Lists Platform** is a modern, full-stack CRUD app built using Node.js, React, Sequelize, and PostgreSQL. It implements Clean Architecture on the backend and a component-based Material-UI frontend, demonstrating robust development practices.

***

## ✨ Key Features

- **Display Restaurants:** View restaurants with names, addresses, and contact info.
- **Add Restaurants:** Use a form to submit new restaurants (stored in the database).
- **Update Restaurants:** Edit restaurant information directly from the frontend.
- **Delete Restaurants:** Remove restaurants seamlessly from the platform.

***

## 🛠️ Technology Stack \& Architecture

| Layer | Technology | Details |
| :-- | :-- | :-- |
| **Backend** | Node.js, Express.js, TypeScript, PostgreSQL, Sequelize | Follows Clean Architecture (Entities, Use Cases, Infrastructure) |
| **Frontend** | React.js, TypeScript, Material-UI (MUI), Vite, Axios | Responsive, component-based UI |


***

## 🏗️ Local Setup \& Installation

**Requirements:**

- Node.js (v18+)
- Git
- PostgreSQL

**Steps:**

1. **Clone the Repository:**
`git clone https://github.com/Faizal661/Restaurant-Listing-Platform.git`
2. **Backend Setup:**
    - Install dependencies: `cd backend && npm install`
    - Start server: `npm run dev`
    - Accessible at: [http://localhost:5000](http://localhost:5000)
3. **Frontend Setup:**
    - Install dependencies: `cd frontend && npm install`
    - Start app: `npm run dev`
    - Accessible at: [http://localhost:5173](http://localhost:5173)

***

## 🔑 Environment Variables

Both backend and frontend require a `.env` file for configuration:

- **Backend:** `/backend/.env`
- **Frontend:** `/frontend/.env`

Refer to `.env.example` for variable references.

***

## 🌐 API Endpoints

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| GET | `/api/restaurants` | Get all restaurants |
| POST | `/api/restaurants` | Create a new restaurant |
| PATCH | `/api/restaurants/:id` | Update an existing restaurant |
| DELETE | `/api/restaurants/:id` | Delete a restaurant |


***

## ✍️ Author

Created and developed by _Your Name Here_
GitHub: [Mohammed Faizal T](https://www.google.com/search?q=https://github.com/Faizal661)

***
