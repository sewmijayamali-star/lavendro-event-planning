import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Venue.css';

const Venue = () => {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/venues`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch venues');
      }

      const data = await response.json();

      console.log('Venues API response:', data);

      /*
        Backend response:

        {
          success: true,
          count: ...,
          venues: [...]
        }
      */

      const venueList = Array.isArray(data.venues)
        ? data.venues
        : [];

      // Only show active venues to customers
      const activeVenues = venueList.filter(
        (venue) => venue.isActive !== false
      );

      setVenues(activeVenues);
    } catch (error) {
      console.error('Error fetching venues:', error);
      setVenues([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="venue-page">
      <Navbar />

      {/* ================= HERO ================= */}

      <section className="venue-hero">
        <motion.div
          className="venue-hero-content"
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
          <h1>Our Event Venues</h1>

          <p>
            Beautiful spaces designed for your unforgettable moments
          </p>
        </motion.div>
      </section>

      {/* ================= VENUES SECTION ================= */}

      <section className="venue-packages-section">

        <h2 className="section-title">
          Find Your Perfect Venue
        </h2>

        <p className="section-subtitle">
          Explore our carefully selected event spaces
        </p>

        {/* Loading */}

        {loading ? (
          <div className="venue-message">
            <p>Loading venues...</p>
          </div>

        ) : venues.length === 0 ? (

          /* Empty */

          <div className="venue-message">
            <p>
              No venues available at the moment.
            </p>
          </div>

        ) : (

          /* Venue Cards */

          <div className="venue-packages-grid">

            {venues.map((venue, index) => (

              <motion.div
                key={venue._id}
                className="venue-package-card"

                initial={{
                  opacity: 0,
                  scale: 0.9
                }}

                whileInView={{
                  opacity: 1,
                  scale: 1
                }}

                transition={{
                  delay: index * 0.15,
                  duration: 0.6
                }}

                viewport={{
                  once: true
                }}
              >

                {/* IMAGE */}

                <div className="venue-package-image">

                  {venue.image ? (
                    <img
                      src={venue.image}
                      alt={venue.name}
                    />
                  ) : (
                    <div className="venue-no-image">
                      No Image Available
                    </div>
                  )}

                  {/* OVERLAY */}

                  <div className="venue-package-overlay">

                    <h3>
                      {venue.name}
                    </h3>

                    {/* BASIC INFORMATION */}

                    <div className="venue-summary">

                      <div className="venue-summary-item">

                        <span>
                          Location
                        </span>

                        <strong>
                          {venue.location || '—'}
                        </strong>

                      </div>

                      <div className="venue-summary-item">

                        <span>
                          Capacity
                        </span>

                        <strong>
                          {venue.capacity || '—'}
                        </strong>

                      </div>

                      <div className="venue-summary-item">

                        <span>
                          Price / Day
                        </span>

                        <strong>
                          LKR{' '}
                          {Number(
                            venue.pricePerDay || 0
                          ).toLocaleString()}
                        </strong>

                      </div>

                    </div>

                    {/* VIEW MORE */}

                    <button
                      type="button"
                      className="btn-view-venue"

                      onClick={() =>
                        setSelectedVenue(venue)
                      }
                    >
                      View More
                    </button>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>
        )}

      </section>

      {/* ================= VENUE DETAILS MODAL ================= */}

      <AnimatePresence>

        {selectedVenue && (

          <motion.div
            className="venue-modal-overlay"

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            exit={{
              opacity: 0
            }}

            onClick={() =>
              setSelectedVenue(null)
            }
          >

            <motion.div
              className="venue-modal"

              initial={{
                scale: 0.8,
                opacity: 0
              }}

              animate={{
                scale: 1,
                opacity: 1
              }}

              exit={{
                scale: 0.8,
                opacity: 0
              }}

              transition={{
                duration: 0.3
              }}

              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* CLOSE */}

              <button
                className="venue-modal-close"

                onClick={() =>
                  setSelectedVenue(null)
                }

                aria-label="Close venue details"
              >
                <Close />
              </button>

              {/* IMAGE */}

              <div className="venue-modal-image">

                {selectedVenue.image ? (
                  <img
                    src={selectedVenue.image}
                    alt={selectedVenue.name}
                  />
                ) : (
                  <div className="venue-no-image">
                    No Image Available
                  </div>
                )}

              </div>

              {/* CONTENT */}

              <div className="venue-modal-content">

                <h2>
                  {selectedVenue.name}
                </h2>

                {/* LOCATION */}

                <div className="venue-location">

                  <span>
                    Location
                  </span>

                  <strong>
                    {selectedVenue.location ||
                      'Location not specified'}
                  </strong>

                </div>

                {/* DESCRIPTION */}

                {selectedVenue.description && (
                  <p className="venue-description">
                    {selectedVenue.description}
                  </p>
                )}

                {/* INFORMATION */}

                <div className="venue-modal-info">

                  <div className="venue-info-item">

                    <span>
                      Capacity
                    </span>

                    <strong>
                      {selectedVenue.capacity
                        ? `${selectedVenue.capacity} Guests`
                        : '—'}
                    </strong>

                  </div>

                  <div className="venue-info-item">

                    <span>
                      Price Per Day
                    </span>

                    <strong>
                      LKR{' '}
                      {Number(
                        selectedVenue.pricePerDay || 0
                      ).toLocaleString()}
                    </strong>

                  </div>

                </div>

                {/* AMENITIES */}

                <div className="venue-amenities">

                  <h3>
                    Venue Amenities
                  </h3>

                  {Array.isArray(
                    selectedVenue.amenities
                  ) &&
                  selectedVenue.amenities.length > 0 ? (

                    <ul>

                      {selectedVenue.amenities.map(
                        (amenity, index) => (

                          <li key={index}>

                            <span>
                              ✓
                            </span>

                            {amenity}

                          </li>

                        )
                      )}

                    </ul>

                  ) : (

                    <p>
                      Venue amenities are
                      available upon request.
                    </p>

                  )}

                </div>

                {/* BOOK BUTTON */}

                <Link
                  to="/contact"
                  className="btn-book-venue"

                  onClick={() =>
                    setSelectedVenue(null)
                  }
                >
                  Book This Venue
                </Link>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* ================= CTA ================= */}

      <section className="venue-book-cta">

        <motion.div
          className="venue-cta-content"

          initial={{
            opacity: 0,
            scale: 0.9
          }}

          whileInView={{
            opacity: 1,
            scale: 1
          }}

          transition={{
            duration: 0.8
          }}

          viewport={{
            once: true
          }}
        >

          <h2>
            Ready to Choose Your Venue?
          </h2>

          <p>
            Let us help you find the perfect
            space for your special event
          </p>

          <Link
            to="/contact"
            className="btn btn-large"
          >
            Contact Us
          </Link>

        </motion.div>

      </section>

      <Footer />

    </div>
  );
};

export default Venue;