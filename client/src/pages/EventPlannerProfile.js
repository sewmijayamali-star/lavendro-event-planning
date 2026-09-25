import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  ArrowBack,
  CalendarMonth,
  CheckCircle,
  School,
  Person
} from '@mui/icons-material';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import '../styles/EventPlannerProfile.css';


// =====================================================
// DEMO CUSTOMER REVIEWS
// =====================================================

const demoReviews = [
  {
    id: 1,
    customerName: 'Sarah Perera',
    rating: 5,
    comment:
      'Rahul was extremely helpful throughout our wedding planning. He understood our ideas and made the whole process much easier.',
    date: '2 months ago'
  },

  {
    id: 2,
    customerName: 'Nethmi Fernando',
    rating: 4.5,
    comment:
      'Very professional and friendly. The event was well organized and everything went smoothly on the day.',
    date: '4 months ago'
  },

  {
    id: 3,
    customerName: 'Amanda Silva',
    rating: 5,
    comment:
      'We loved working with the Lavendro team. Our planner paid attention to every little detail and made our celebration memorable.',
    date: '6 months ago'
  }
];


// Demo average rating
const averageRating = 4.8;


const EventPlannerProfile = () => {

  // =====================================================
  // GET PLANNER ID FROM URL
  // =====================================================

  const { id } = useParams();


  // =====================================================
  // STATES
  // =====================================================

  const [planner, setPlanner] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');


  // =====================================================
  // FETCH EVENT PLANNER
  // =====================================================

  useEffect(() => {

    const fetchPlanner = async () => {

      try {

        setLoading(true);

        setError('');


        // -----------------------------------------------
        // API REQUEST
        // -----------------------------------------------

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/event-planners/${id}`
        );


        // -----------------------------------------------
        // GET RESPONSE DATA
        // -----------------------------------------------

        const data = await response.json();


        console.log(
          'Event Planner Profile:',
          data
        );


        // -----------------------------------------------
        // CHECK RESPONSE
        // -----------------------------------------------

        if (!response.ok) {

          throw new Error(
            data.message ||
            'Failed to load event planner.'
          );

        }


        // -----------------------------------------------
        // SAVE PLANNER
        // -----------------------------------------------

        setPlanner(data.eventPlanner);

      } catch (error) {

        console.error(
          'Event planner profile error:',
          error
        );


        setError(
          error.message ||
          'Unable to load event planner profile.'
        );

      } finally {

        setLoading(false);

      }

    };


    fetchPlanner();

  }, [id]);


  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {

    return (

      <div className="planner-profile-page">

        <Navbar />


        <div className="planner-profile-loading">

          <div className="profile-spinner"></div>

          <p>
            Loading planner profile...
          </p>

        </div>


        <Footer />

      </div>

    );

  }


  // =====================================================
  // ERROR SCREEN
  // =====================================================

  if (error || !planner) {

    return (

      <div className="planner-profile-page">

        <Navbar />


        <div className="planner-profile-error">

          <Person />


          <h2>
            Planner Not Available
          </h2>


          <p>
            {error ||
              'This event planner could not be found.'}
          </p>


          <Link
            to="/event-planners"
            className="back-planners-button"
          >

            <ArrowBack />

            <span>
              Back to Event Planners
            </span>

          </Link>

        </div>


        <Footer />

      </div>

    );

  }


  // =====================================================
  // MAIN PROFILE PAGE
  // =====================================================

  return (

    <div className="planner-profile-page">

      <Navbar />


      {/* =================================================
          PROFILE HERO
      ================================================= */}

      <section className="planner-profile-hero">

        <div className="planner-profile-container">


          {/* BACK BUTTON */}

          <Link
            to="/event-planners"
            className="back-planners-link"
          >

            <ArrowBack />

            <span>
              Back to Event Planners
            </span>

          </Link>


          {/* =================================================
              PROFILE MAIN
          ================================================= */}

          <div className="planner-profile-main">


            {/* =================================================
                PROFILE IMAGE
            ================================================= */}

            <motion.div
              className="planner-profile-image-wrapper"

              initial={{
                opacity: 0,
                x: -40
              }}

              animate={{
                opacity: 1,
                x: 0
              }}

              transition={{
                duration: 0.7
              }}
            >

              {planner.profilePhoto ? (

                <img
                  src={planner.profilePhoto}
                  alt={planner.fullName}
                  className="planner-profile-image"
                />

              ) : (

                <div className="planner-profile-placeholder">

                  <Person />

                </div>

              )}


              {/* ACTIVE STATUS */}

              <div className="profile-active-badge">

                <CheckCircle />

                <span>
                  Available
                </span>

              </div>

            </motion.div>


            {/* =================================================
                PROFILE INFORMATION
            ================================================= */}

            <motion.div
              className="planner-profile-info"

              initial={{
                opacity: 0,
                x: 40
              }}

              animate={{
                opacity: 1,
                x: 0
              }}

              transition={{
                duration: 0.7
              }}
            >

              <span className="profile-eyebrow">
                LAVENDRO EVENT PLANNER
              </span>


              <h1>
                {planner.fullName}
              </h1>


              <p className="profile-intro">

                Professional event planning support
                for creating memorable and beautifully
                organized events.

              </p>


              {/* =================================================
                  QUALIFICATIONS
              ================================================= */}

              <div className="profile-qualifications">

                <div className="qualification-heading">

                  <School />

                  <h3>
                    Qualifications
                  </h3>

                </div>


                {planner.qualifications &&
                planner.qualifications.length > 0 ? (

                  <div className="qualification-list">

                    {planner.qualifications.map(
                      (qualification, index) => (

                        <div
                          className="qualification-item"
                          key={index}
                        >

                          <CheckCircle />

                          <span>
                            {qualification}
                          </span>

                        </div>

                    ))}

                  </div>

                ) : (

                  <p>
                    Professional event planning
                    experience.
                  </p>

                )}

              </div>


              {/* =================================================
                  BOOK BUTTON
              ================================================= */}

              <div className="profile-actions">

                <Link
                  to={`/event-planners/${planner._id}/book`}
                  className="book-planner-button"
                >

                  <CalendarMonth />

                  <span>
                    Book This Planner
                  </span>

                </Link>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT SECTION
      ===================================================== */}

      <section className="planner-about-section">

        <div className="planner-about-container">


          {/* ABOUT TEXT */}

          <motion.div
            className="planner-about-content"

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

            <span className="about-label">
              WORK WITH OUR TEAM
            </span>


            <h2>
              Let's Create Your Perfect Event
            </h2>


            <p>

              Your event deserves thoughtful planning,
              professional coordination and attention
              to every detail. Work with our event
              planning team to bring your vision to life.

            </p>

          </motion.div>


          {/* FEATURES */}

          <div className="planner-about-features">


            {/* FEATURE 1 */}

            <div className="about-feature">

              <CheckCircle />

              <div>

                <h3>
                  Professional Planning
                </h3>

                <p>
                  Get support from an experienced
                  Lavendro event planner.
                </p>

              </div>

            </div>


            {/* FEATURE 2 */}

            <div className="about-feature">

              <CheckCircle />

              <div>

                <h3>
                  Personalized Support
                </h3>

                <p>
                  Discuss your event requirements
                  directly with your planner.
                </p>

              </div>

            </div>


            {/* FEATURE 3 */}

            <div className="about-feature">

              <CheckCircle />

              <div>

                <h3>
                  Event Coordination
                </h3>

                <p>
                  Plan and coordinate your event
                  with professional guidance.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CUSTOMER REVIEWS SECTION
      ===================================================== */}

      <section className="planner-reviews-section">

        <div className="planner-reviews-container">


          {/* =================================================
              REVIEWS HEADING
          ================================================= */}

          <motion.div
            className="planner-reviews-heading"

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
              CUSTOMER EXPERIENCES
            </span>


            <h2>
              What Our Customers Say
            </h2>


            <p>

              Hear from customers who have worked
              with our event planning team.

            </p>

          </motion.div>


          {/* =================================================
              RATING SUMMARY
          ================================================= */}

          <motion.div
            className="rating-summary"

            initial={{
              opacity: 0,
              y: 20
            }}

            whileInView={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.6
            }}

            viewport={{
              once: true
            }}
          >

            <div className="rating-number">

              {averageRating}

            </div>


            <div className="rating-details">

              <div className="stars">

                {[1, 2, 3, 4, 5].map(
                  (star) => (

                    <span
                      key={star}
                      className="rating-star"
                    >
                      ★
                    </span>

                  )
                )}

              </div>


              <p>
                Based on {demoReviews.length}
                {' '}customer reviews
              </p>

            </div>

          </motion.div>


          {/* =================================================
              DEMO NOTE
          ================================================= */}

          <div className="demo-review-note">

            <span>
              Demo Content
            </span>

            <p>
              Sample customer ratings and comments
              are displayed for demonstration purposes.
            </p>

          </div>


          {/* =================================================
              REVIEW CARDS
          ================================================= */}

          <div className="planner-reviews-grid">

            {demoReviews.map(
              (review, index) => (

                <motion.div
                  className="customer-review-card"

                  key={review.id}

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


                  {/* CUSTOMER INFORMATION */}

                  <div className="review-customer">

                    <div className="customer-avatar">

                      {review.customerName.charAt(0)}

                    </div>


                    <div>

                      <h3>
                        {review.customerName}
                      </h3>

                      <span>
                        {review.date}
                      </span>

                    </div>

                  </div>


                  {/* RATING */}

                  <div className="review-rating">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (

                        <span
                          key={star}
                          className={
                            star <=
                            Math.floor(
                              review.rating
                            )
                              ? 'star active'
                              : 'star'
                          }
                        >
                          ★
                        </span>

                      )
                    )}


                    <span className="rating-value">
                      {review.rating}
                    </span>

                  </div>


                  {/* COMMENT */}

                  <p className="review-comment">

                    "{review.comment}"

                  </p>

                </motion.div>

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

    </div>

  );

};


export default EventPlannerProfile;