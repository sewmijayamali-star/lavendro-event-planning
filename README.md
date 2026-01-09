# Lavendro Event Planning System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application for managing event planning services. This system allows users to browse services, make inquiries, and plan their events seamlessly.

---

## Live Deployment

- **Frontend:** [https://lavendroeventplanning.vercel.app](https://lavendroeventplanning.vercel.app)
- **Backend API:** [https://lavendro-event-planning-2.onrender.com](https://lavendro-event-planning-2.onrender.com)

---

## Features

### User Features
- User authentication (Email/Password & Google OAuth)
- Browse event planning services
- View and select menus
- Explore available venues
- Submit inquiries for events
- Read blogs and event planning tips

### Admin Features
- User management
- Package management
- Menu customization
- Inquiry handling

---

## Technologies Used

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **CSS3** - Styling
- **Google OAuth** - Third-party authentication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Database hosting

---

## Project Structure

```
lavendro-event-planning/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   │   └── images/        # Image files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   └── App.js         # Main app component
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── server.js         # Entry point
│   └── package.json
│
└── README.md
```

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Google Cloud Console project (for OAuth)

### 1. Clone the Repository

```bash
git clone https://github.com/sewmijayamali-star/lavendro-event-planning.git
cd lavendro-event-planning
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `server/` directory:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
CLIENT_URL=https://lavendroeventplanning.vercel.app
CORS_ORIGIN=https://lavendroeventplanning.vercel.app
```

Start backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Create `.env` file in `client/` directory:

```
REACT_APP_API_URL=https://lavendro-event-planning-2.onrender.com
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login

### Inquiries
- `GET /api/inquiries` - Get all inquiries
- `POST /api/inquiries` - Create new inquiry

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get package by ID

### Menus
- `GET /api/menus` - Get all menus
- `GET /api/menus/:id` - Get menu by ID

---

## Known Issues

- Render free tier: Backend may sleep after 15 minutes of inactivity (50-second wake-up time)
- First request after deployment may be slower

---

## Future Enhancements

- Real-time chat support
- Payment gateway integration
- Email notifications for bookings
- Admin analytics dashboard
- Event calendar integration

---

## Contributors

**Group Members:**

- S.J.Samarasinghe - ICT23921
- S.H. Imasha Sayakkara - ICT23927
- H.S.D.Gunarathna - ICT23835
- M.A.V.V.M.Arachchi - ICT23809
- G.A.G.R.P.Nawarathne - ICT23885

---

## Contact

- **Email:** sewmijayamali369@gmail.com
- **GitHub:** @sewmijayamali-star
