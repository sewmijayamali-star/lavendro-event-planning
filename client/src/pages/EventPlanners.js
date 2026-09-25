import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowForward,
  School,
  Person
} from '@mui/icons-material';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import '../styles/EventPlanners.css';

const EventPlanners = () => {

  // =====================================================
  // STATES
  // =====================================================

  const [planners, setPlanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  // =====================================================
  // FETCH EVENT PLANNERS
  // =====================================================

  useEffect(() => {

    const fetchEventPlanners = async () => {

      try {

        setLoading(true);
        setError('');

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/event-planners`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch event planners.');
        }

        const data = await response.json();

        console.log('Event Planner API Response:', data);

        const plannerList = Array.isArray(data.eventPlanners)
          ? data.eventPlanners
          : [];

        setPlanners(plannerList);

      } catch (error) {

        console.error(
          'Event planner fetch error:',
          error
        );

        setError(
          'Unable to load event planners. Please try again.'
        );

      } finally {

        setLoading(false);

      }
    };

    fetchEventPlanners();

  }, []);


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="event-planners-page">

      <Navbar />


      {/* =================================================
          HERO SECTION
      ================================================= */}

      <section className="event-planners-hero">

        <motion.div
          className="event-planners-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span className="hero-label">
            OUR PROFESSIONAL TEAM
          </span>

          <h1>
            Meet Our Event Planners
          </h1>

          <p>
            Connect with our professional event planners
            and find the right person to bring your
            special occasion to life.
          </p>

        </motion.div>

      </section>


      {/* =================================================
          PLANNER SECTION
      ================================================= */}

      <section className="event-planners-section">

        <div className="event-planners-container">


          {/* SECTION HEADER */}

          <motion.div
            className="event-planners-heading"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >

            <span>
              LAVENDRO TEAM
            </span>

            <h2>
              Our Event Planners
            </h2>

            <p>
              Choose a professional event planner who
              understands your vision and can help you
              create a memorable event.
            </p>

          </motion.div>


          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (

            <div className="planner-loading">

              <div className="planner-spinner"></div>

              <p>
                Loading event planners...
              </p>

            </div>

          )}


          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (

            <div className="planner-error">

              <p>{error}</p>

              <button
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>

            </div>

          )}


          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading &&
            !error &&
            planners.length === 0 && (

              <div className="planner-empty">

                <Person />

                <h3>
                  No Event Planners Available
                </h3>

                <p>
                  Our event planners will be available
                  soon. Please check back later.
                </p>

              </div>

          )}


          {/* =================================================
              PLANNER GRID
          ================================================= */}

          {!loading &&
            !error &&
            planners.length > 0 && (

              <div className="event-planners-grid">

                {planners.map((planner, index) => (

                  <motion.div
                    className="event-planner-card"
                    key={planner._id}
                    initial={{
                      opacity: 0,
                      y: 30
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    viewport={{
                      once: true
                    }}
                  >

                    {/* PROFILE IMAGE */}

                    <div className="planner-image-container">

                      {planner.profilePhoto ? (

                        <img
                          src={planner.profilePhoto}
                          alt={planner.fullName}
                          className="planner-image"
                        />

                      ) : (

                        <div className="planner-image-placeholder">
                          <Person />
                        </div>

                      )}

                      <div className="planner-status">
                        Available
                      </div>

                    </div>


                    {/* CARD CONTENT */}

                    <div className="planner-card-content">

                      <span className="planner-label">
                        EVENT PLANNER
                      </span>

                      <h3>
                        {planner.fullName}
                      </h3>


                      {/* QUALIFICATIONS */}

                      {planner.qualifications &&
                        planner.qualifications.length > 0 && (

                        <div className="planner-qualifications">

                          <School />

                          <div>

                            {planner.qualifications
                              .slice(0, 2)
                              .map((qualification, qualificationIndex) => (

                                <span
                                  key={qualificationIndex}
                                >
                                  {qualification}
                                </span>

                              ))}

                          </div>

                        </div>

                      )}


                      {/* BUTTON */}

                      <Link
                        to={`/event-planners/${planner._id}`}
                        className="planner-view-button"
                      >

                        <span>
                          View Profile
                        </span>

                        <ArrowForward />

                      </Link>

                    </div>

                  </motion.div>

                ))}

              </div>

          )}

        </div>

      </section>


      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      <section className="planner-bottom-cta">

        <div className="planner-cta-content">

          <span>
            NEED HELP?
          </span>

          <h2>
            Not Sure Which Planner to Choose?
          </h2>

          <p>
            Our support team can help you understand
            our services and guide you through the
            event planning process.
          </p>

          <Link
            to="/support"
            className="planner-support-button"
          >
            Chat With Support
            <ArrowForward />

          </Link>

        </div>

      </section>


      <Footer />

    </div>
  );
};

export default EventPlanners;