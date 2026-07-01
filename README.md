# DacBy Order Dashboard Assignment 📦


### Full Stack Order Management System

Technical Assignment for **Full Stack Developer**

Built with the **MERN Stack** featuring a React dashboard, REST APIs, MongoDB, scheduled background jobs, order status automation, and secure backend architecture.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-API-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-green)



---

# 📋 Table of Contents

* Overview
* Assignment Objective
* Features
* Tech Stack
* Project Structure
* System Design
* Database Design
* Order Status Flow
* Scheduler
* API Endpoints
* Environment Variables
* Installation
* Running the Application
* Scheduler Setup
* Postman Collection
* Future Improvements

---

# 📌 Overview

This repository contains my submission for the **DacBy Full Stack Developer Assignment**.

The application demonstrates the development of a production-style Order Management System consisting of:

* RESTful backend APIs
* React dashboard
* MongoDB database
* Automated order status updates
* Background scheduler
* Secure scheduler endpoint
* Clean folder structure
* Modular architecture

The project follows software engineering best practices with scalability and maintainability in mind.

---

# 🎯 Assignment Objective

The objective of this assignment is to demonstrate proficiency in:

* Backend API Development
* Database Design
* React Dashboard Development
* Scheduled Background Jobs
* REST API Design
* Error Handling
* System Design
* Code Organization
* Scalability Considerations

---

# ✨ Features

## Backend

* Create Orders
* Get Orders
* Filter Orders by Status
* Update Order Status
* Status History Tracking
* Scheduler Execution Logs
* Secure Scheduler Endpoint
* MongoDB Integration
* Environment Configuration
* Modular Services

---

## Frontend Dashboard

* Orders Table
* Status Filter
* Loading State
* Empty State
* Error State
* Auto Refresh
* Responsive Dashboard
* Order Statistics

---

## Scheduler

* Runs Every 5 Minutes
* Detects Expired Orders
* Updates Order Status Automatically
* Maintains Status History
* Stores Scheduler Logs
* Secret Header Authentication

---

# 🛠 Tech Stack

## Frontend

* React.js
* JavaScript
* Axios
* CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Scheduler

* Node Cron

## Development Tools

* Git
* Postman
* VS Code

---

# 📂 Project Structure

```text
dacby-order-dashboard-assignment/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── scheduler/
│   │   ├── utils/
│   │   └── app.js
│   └── package.json
│
├── postman/
├── docs/
├── .gitignore
├── README.md
└── docker-compose.yml (Optional)
```

---

# 🏗 System Design

## Database

**MongoDB** was selected because:

* Flexible document model
* Easy schema evolution
* Excellent Node.js integration
* Suitable for rapidly changing business requirements

---

## Collections

### Orders

Stores all customer orders.

Fields include:

* Order ID
* Customer Name
* Phone Number
* Product Name
* Amount
* Payment Status
* Current Status
* Created At
* Updated At

---

### Status History

Stores every status transition.

Example:

```text
PLACED
↓

PROCESSING
↓

READY_TO_SHIP
```

Each entry records:

* Previous Status
* New Status
* Timestamp
* Updated By

---

### Scheduler Logs

Every scheduler execution records:

* Execution Time
* Orders Processed
* Orders Updated
* Execution Status
* Errors (if any)

---

# 🔄 Order Status Flow

```text
PLACED
   │
   │ 10 Minutes
   ▼
PROCESSING
   │
   │ 20 Minutes
   ▼
READY_TO_SHIP
```

The scheduler automatically updates eligible orders based on their age.

---

# ⏰ Scheduler

The scheduler runs every **5 minutes**.

Responsibilities:

* Find eligible orders
* Update order status
* Record status history
* Save execution logs

The scheduler endpoint is protected using a secret header.

Example:

```http
x-scheduler-secret: YOUR_SECRET_KEY
```

---

# 📡 API Endpoints

## Orders

### Use : 
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/order_management

CLIENT_URL=http://localhost:5173

SCHEDULER_SECRET_KEY=your_super_secret_key

NODE_ENV=development

| Method | Endpoint                            | Description        |
| ------ | ---------------------------         | ------------------ |
| POST   | `/api/orders`                       | Create Order       |
| GET    | `/api/orders`                       | Get Orders         |
| GET    | `/api/orders?status=PLACED`         | Filter Orders      |
| GET    | `/api/orders?status=PROCESSING`     | Filter Orders      |
| GET    | `/api/orders?status=READY_TO_SHIP`  | Filter Orders      |
| GET    | `/api/orders/:id`                   | Get Order By ID    |
| PATCH  | `/api/orders/:id`                   | Update Order By ID |
| DELETE | `/api/orders/:id`                   | Delete Order By ID |

---

## Scheduler

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/scheduler/run` | Execute Scheduler |

### NOTE : 
x-secret-key : your_super_secret_key

---

# 🔐 Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5000

MONGODB_URI=

CLIENT_URL=

SCHEDULER_SECRET=

NODE_ENV=development
```

---

# ⚙️ Installation

Clone the repository.

```bash
git clone https://github.com/izarvek/dacby-order-dashboard-assignment.git
```

Move into the project.

```bash
cd dacby-order-dashboard-assignment
```

---

## Install Backend Dependencies

```bash
cd server
npm install
```

---

## Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

# 🚀 Running the Application

## Backend

```bash
cd server
npm run dev
```

---

## Frontend

```bash
cd client
npm start
```

---

# ⏳ Scheduler Setup

For local development, the scheduler is configured using **node-cron**.

Cron Expression:

```text
*/5 * * * *
```

This executes the scheduler every **5 minutes**.

For production, it can be migrated to services such as:

* GitHub Actions
* Railway Cron
* Render Cron
* AWS EventBridge
* Google Cloud Scheduler
* Vercel Cron

---

# 📬 API Testing

A Postman collection is included inside the `postman/` directory.

It contains:

* Order APIs
* Scheduler API
* Sample Requests
* Environment Variables

---

# 📈 Scalability Considerations

The application is designed with scalability in mind.

* Modular Architecture
* Service Layer
* Separate Controllers
* Independent Scheduler Module
* MongoDB Indexing
* Environment-Based Configuration
* Easily Deployable Services

---

# 🚀 Future Improvements

* Authentication & Authorization
* Role-Based Access Control
* Pagination
* Search by Order ID
* Search by Customer Name
* Order Analytics Dashboard
* Email Notifications
* Docker Support
* Unit Testing
* CI/CD Pipeline
* Deployment

---

# 📄 Assignment Notes

This project was completed as part of the **DacBy Full Stack Developer Assignment**.

The implementation focuses on:

* Clean Architecture
* Readable Code
* Modular Folder Structure
* Production-Oriented Development Practices
* Maintainable APIs
* Scalable Database Design

---

# 👨‍💻 Author

### Aadhi Sharma

Full Stack Software Developer

* GitHub: https://github.com/izarvek

---

# ⭐ Thank You

Thank you for reviewing my assignment.

I appreciate the opportunity to demonstrate my technical skills and software engineering approach through this project.
