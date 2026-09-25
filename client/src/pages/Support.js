import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChatBubbleOutline,
  Event,
  CreditCard,
  PersonOutline,
  ArrowForward
} from '@mui/icons-material';

import '../styles/Support.css';

const Support = () => {
  return (
    <div className="support-page">

      {/* ==========================================
          NAVIGATION
      ========================================== */}
      <header className="support-navbar">

        <div className="support-navbar-inner">

          {/* Logo */}
          <Link to="/" className="support-logo">
            Lavendro
          </Link>

          {/* Navigation Links */}
          <nav className="support-nav-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/contact">
              Contact
            </Link>

            <Link to="/login" className="support-login-link">
              Login
            </Link>

          </nav>

        </div>

      </header>


      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <section className="support-hero">

        <div className="support-hero-content">

          <span className="support-eyebrow">
            ✦ LAVENDRO SUPPORT
          </span>

          <h1>
            How Can We
            <span> Help You?</span>
          </h1>

          <p>
            Our support team is here to help you plan,
            manage, and enjoy your perfect event.
          </p>

          <Link
            to="/support/chat"
            className="support-start-button"
          >
            <ChatBubbleOutline />

            <span>
              Start a Conversation
            </span>

            <ArrowForward />
          </Link>

        </div>

      </section>


      {/* ==========================================
          SUPPORT CATEGORIES
      ========================================== */}
      <section className="support-categories">

        <div className="support-section-heading">

          <span>
            WHAT CAN WE HELP WITH?
          </span>

          <h2>
            We're Here For You
          </h2>

          <p>
            Choose a topic or start a conversation
            with our support team.
          </p>

        </div>


        <div className="support-category-grid">

          {/* Event Booking */}
          <div className="support-category-card">

            <div className="support-category-icon">
              <ChatBubbleOutline />
            </div>

            <h3>
              Event Booking
            </h3>

            <p>
              Get help with your event booking,
              reservations, and booking-related questions.
            </p>

          </div>


          {/* Planning Help */}
          <div className="support-category-card">

            <div className="support-category-icon">
              <Event />
            </div>

            <h3>
              Planning Help
            </h3>

            <p>
              Talk to our team about event planning,
              packages, venues, menus, and services.
            </p>

          </div>


          {/* Payments */}
          <div className="support-category-card">

            <div className="support-category-icon">
              <CreditCard />
            </div>

            <h3>
              Payments
            </h3>

            <p>
              Have questions about payments,
              transactions, or your booking payment?
            </p>

          </div>


          {/* Account */}
          <div className="support-category-card">

            <div className="support-category-icon">
              <PersonOutline />
            </div>

            <h3>
              Account Support
            </h3>

            <p>
              Need help with your Lavendro account,
              login, or account-related issues?
            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          BOTTOM CTA
      ========================================== */}
      <section className="support-bottom-cta">

        <div className="support-cta-content">

          <span className="support-cta-icon">
            💬
          </span>

          <div>

            <h2>
              Need immediate assistance?
            </h2>

            <p>
              Our support team is ready to help you
              through live chat.
            </p>

          </div>

          <Link
            to="/support/chat"
            className="support-cta-button"
          >
            Chat With Us
            <ArrowForward />
          </Link>

        </div>

      </section>


      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer className="support-footer">

        <p>
          © {new Date().getFullYear()} Lavendro Event Planning.
          All rights reserved.
        </p>

      </footer>

    </div>
  );
};

export default Support;