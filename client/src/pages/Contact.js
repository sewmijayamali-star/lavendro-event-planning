import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  Event,
  SupportAgent
} from '@mui/icons-material';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">

      <Navbar />

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section className="contact-hero">

        <motion.div
          className="contact-hero-content"

          initial={{
            opacity: 0,
            y: 30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.8
          }}
        >

          <h1>
            Get in Touch
          </h1>

          <p>
            Let's start planning your dream event together
          </p>

        </motion.div>

      </section>


      {/* =========================================
          CONTACT MAIN SECTION
      ========================================= */}

      <section className="contact-main-section">

        <div className="contact-container">


          {/* =====================================
              LEFT SIDE
          ===================================== */}

          <motion.div
            className="contact-info-container"

            initial={{
              opacity: 0,
              x: -50
            }}

            whileInView={{
              opacity: 1,
              x: 0
            }}

            transition={{
              duration: 0.8
            }}

            viewport={{
              once: true
            }}
          >

            <h2>
              Contact Information
            </h2>


            {/* ================================
                CONTACT CARDS
            ================================= */}

            <div className="contact-info-cards">


              {/* PHONE */}

              <div className="info-card">

                <div className="info-icon">
                  <Phone />
                </div>

                <div className="info-details">

                  <h3>
                    Phone
                  </h3>

                  <p>
                    +94 123 456 789
                  </p>

                  <p>
                    +94 987 654 321
                  </p>

                </div>

              </div>


              {/* EMAIL */}

              <div className="info-card">

                <div className="info-icon">
                  <Email />
                </div>

                <div className="info-details">

                  <h3>
                    Email
                  </h3>

                  <p>
                    info@lavendro.com
                  </p>

                  <p>
                    events@lavendro.com
                  </p>

                </div>

              </div>


              {/* ADDRESS */}

              <div className="info-card">

                <div className="info-icon">
                  <LocationOn />
                </div>

                <div className="info-details">

                  <h3>
                    Address
                  </h3>

                  <p>
                    123 Event Avenue
                  </p>

                  <p>
                    Negombo, Western Province, Sri Lanka
                  </p>

                </div>

              </div>

            </div>


            {/* =================================
                SOCIAL MEDIA
            ================================= */}
            <div className="social-media">

  <h3>
    Follow Us
  </h3>

  <div className="social-icons">

    <button
      type="button"
      className="social-icon"
      aria-label="Facebook"
    >
      <Facebook />
    </button>

    <button
      type="button"
      className="social-icon"
      aria-label="Instagram"
    >
      <Instagram />
    </button>

    <button
      type="button"
      className="social-icon"
      aria-label="Twitter"
    >
      <Twitter />
    </button>

    <button
      type="button"
      className="social-icon"
      aria-label="LinkedIn"
    >
      <LinkedIn />
    </button>

  </div>

</div>
           

            {/* =================================
                BUSINESS HOURS
            ================================= */}

            <div className="business-hours">

              <h3>
                Business Hours
              </h3>

              <p>
                Monday - Friday: 9:00 AM - 6:00 PM
              </p>

              <p>
                Saturday: 10:00 AM - 4:00 PM
              </p>

              <p>
                Sunday: By Appointment
              </p>

            </div>

          </motion.div>


          {/* =====================================
              RIGHT SIDE - CUSTOMER ACTIONS
          ===================================== */}

          <motion.div
            className="contact-actions-container"

            initial={{
              opacity: 0,
              x: 50
            }}

            whileInView={{
              opacity: 1,
              x: 0
            }}

            transition={{
              duration: 0.8
            }}

            viewport={{
              once: true
            }}
          >

            <div className="contact-actions-header">

              <span className="contact-action-label">
                HOW CAN WE HELP?
              </span>

              <h2>
                Let's Plan Your Perfect Event
              </h2>

              <p>
                Whether you need a professional event planner
                or assistance from our support team, we're
                here to help you every step of the way.
              </p>

            </div>


            {/* =================================
                EVENT PLANNER CARD
            ================================= */}

            <div className="contact-action-card">

              <div className="contact-action-icon">
                <Event />
              </div>

              <div className="contact-action-content">

                <h3>
                  Meet Our Event Planners
                </h3>

                <p>
                  Connect with our professional event planners,
                  explore their profiles and find the right
                  planner for your special occasion.
                </p>

                <Link
                  to="/event-planners"
                  className="contact-action-button"
                >
                  <span>
                    Meet Event Planners
                  </span>

                  <span className="button-arrow">
                    →
                  </span>

                </Link>

              </div>

            </div>


            {/* =================================
                SUPPORT CARD
            ================================= */}

            <div className="contact-action-card support-action-card">

              <div className="contact-action-icon">
                <SupportAgent />
              </div>

              <div className="contact-action-content">

                <h3>
                  Chat With Support
                </h3>

                <p>
                  Have a question about our services, bookings,
                  packages or anything else? Chat directly
                  with our support team.
                </p>

                <Link
                  to="/support"
                  className="contact-action-button"
                >
                  <span>
                    Chat With Support
                  </span>

                  <span className="button-arrow">
                    →
                  </span>

                </Link>

              </div>

            </div>


            {/* =================================
                SMALL INFORMATION
            ================================= */}

            <div className="contact-response-note">

              <span className="response-dot"></span>

              <p>
                Our team is ready to assist you with
                your event planning needs.
              </p>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =========================================
          LOCATION SECTION
      ========================================= */}

      <section className="map-section">

        <motion.div
          className="location-heading"

          initial={{
            opacity: 0,
            y: 30
          }}

          whileInView={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.7
          }}

          viewport={{
            once: true
          }}
        >

          <span>
            VISIT US
          </span>

          <h2>
            Find Us
          </h2>

          <p>
            Visit Lavendro Event Planning and let's
            start creating your perfect event together.
          </p>

        </motion.div>


        <motion.div
          className="map-container"

          initial={{
            opacity: 0,
            y: 50
          }}

          whileInView={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.8
          }}

          viewport={{
            once: true
          }}
        >

          <iframe
            title="Lavendro Location"

            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.81222073434!2d79.83267!3d7.20889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2ee9c6bb2f73b%3A0xa51626e908186f3e!2sNegombo!5e0!3m2!1sen!2slk!4v1234567890"

            width="100%"
            height="450"

            style={{
              border: 0,
              borderRadius: '20px'
            }}

            allowFullScreen

            loading="lazy"
          />

        </motion.div>

      </section>


      <Footer />

    </div>
  );
};

export default Contact;