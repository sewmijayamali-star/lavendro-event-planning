import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Menu from './pages/Menu';
import Venues from './pages/Venues';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Support from './pages/Support';

// Authentication
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Admin
import AdminDashboard from './pages/admin/dashboard.js';
import AcceptAdminInvite from './pages/AcceptAdminInvite';

// Customer
import UserDashboard from './pages/Dashboard';

// Support
import SupportChat from './pages/SupportChat';


import AcceptSupportInvite from "./pages/AcceptSupportInvite";


/* =========================================
   APP CONTENT
========================================= */

const AppContent = () => {

  const location = useLocation();

  /*
    Hide the public Navbar on Admin Dashboard.
    Admin Dashboard has its own sidebar and topbar.
  */

  const isAdminDashboard =
    location.pathname === '/admin/dashboard';

  return (
    <>
      {!isAdminDashboard && <Navbar />}

      <Routes>

        {/* =====================================
            PUBLIC ROUTES
        ====================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/menu"
          element={<Menu />}
        />

        <Route
          path="/venues"
          element={<Venues />}
        />

        <Route
          path="/blogs"
          element={<Blogs />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/support"
          element={<Support />}
        />


        {/* =====================================
            AUTHENTICATION
        ====================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:resetToken"
          element={<ResetPassword />}
        />


        {/* =====================================
            ADMIN INVITATION
        ====================================== */}

        <Route
          path="/admin/accept-invite/:token"
          element={<AcceptAdminInvite />}
        />

        <Route
  path="/support/accept-invite/:token"
  element={<AcceptSupportInvite />}
/>

<Route
  path="/support/accept-invite/:token"
  element={<AcceptSupportInvite />}
/>


        {/* =====================================
            CUSTOMER
        ====================================== */}

        <Route
          path="/dashboard"
          element={<UserDashboard />}
        />


        {/* =====================================
            CUSTOMER SUPPORT CHAT
        ====================================== */}

        <Route
          path="/support/chat"
          element={<SupportChat />}
        />


        {/* =====================================
            PROTECTED ADMIN
        ====================================== */}

        <Route element={<ProtectedAdminRoute />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

        </Route>


        {/* =====================================
            SUPPORT DASHBOARD
            Will be added next
        ====================================== */}

        {/* 
        <Route
          path="/support/dashboard"
          element={<SupportDashboard />}
        />
        */}


        {/* =====================================
            EVENT PLANNER DASHBOARD
            Will be added later
        ====================================== */}

        {/* 
        <Route
          path="/planner/dashboard"
          element={<PlannerDashboard />}
        />
        */}

      </Routes>
    </>
  );
};


/* =========================================
   APP
========================================= */

function App() {

  return (
    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  );
}

export default App;