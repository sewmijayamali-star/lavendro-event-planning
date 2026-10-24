# Lavendro Event Planning 🌸

A full-stack event planning platform built with the MERN stack, designed to simplify event service discovery, booking management, and communication between customers and event planners.

## 🌐 Live Demo

**Live Application:** https://lavendro-event-planning.vercel.app/

- Frontend: Vercel
- Backend: AWS EC2
- Database: MongoDB Atlas
- Image Storage: Supabase Storage

## ✨ Key Features

- **User Authentication** — Secure access for different user roles.
- **Event Packages** — Explore event planning packages and services.
- **Venue & Menu Management** — Manage event venues, menus, and related images.
- **Booking Management** — Support event booking workflows.
- **Event Planner Interaction** — Connect customers with event planners.
- **Customer Support** — Dedicated support conversation management.
- **Admin Management** — Administrative operations and account invitation workflow.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Image Storage | Supabase Storage |
| Frontend Hosting | Vercel |
| Backend Hosting | AWS EC2 |
| API | REST API |

## 🏗️ Architecture

```text
React + Vite (Vercel)
        |
        | REST API / HTTP
        v
Node.js + Express (AWS EC2)
        |
        +------ MongoDB Atlas
        |
        +------ Supabase Storage
```

## 🚀 Getting Started

**Prerequisites:** Node.js, npm, MongoDB Atlas, and Supabase credentials.

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Lavendro
```

Install dependencies and start the backend:

```bash
cd backend
npm install
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Configure the required environment variables for the frontend and backend before running the application. Use the project's existing variable names and keep sensitive credentials out of source control.

## 🔐 Environment Variables

Configure the variables required by your implementation, including:

- MongoDB connection string
- JWT secret
- Supabase project credentials
- Email service credentials, if enabled
- Frontend API base URL

Never commit `.env` files or expose backend secrets in frontend code.

## 👩‍💻 Project Purpose

Lavendro Event Planning demonstrates full-stack web development, REST API integration, database management, cloud deployment, authentication, and external storage integration.

---

**Developed as a full-stack web development project.**
