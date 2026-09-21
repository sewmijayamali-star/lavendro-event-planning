import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Services.css';

const Services = () => {
  const [eventPackages, setEventPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/packages`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }

      const data = await response.json();

      console.log('Packages API response:', data);

      /*
        Backend returns:

        {
          success: true,
          count: ...,
          packages: [...]
        }
      */

      const packages = Array.isArray(data.packages)
        ? data.packages
        : [];

      // Only show active packages to customers
      const activePackages = packages.filter(
        (pkg) => pkg.isActive !== false
      );

      setEventPackages(activePackages);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setEventPackages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="services-page">
      <Navbar />

      {/* ================= HERO ================= */}

      <section className="services-hero">
        <motion.div
          className="services-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Our Services & Packages</h1>

          <p>
            Tailored solutions for your perfect celebration
          </p>
        </motion.div>
      </section>

      {/* ================= PACKAGES SECTION ================= */}

      <section className="packages-section">
        <h2 className="section-title">
          Choose Your Perfect Package
        </h2>

        <p className="section-subtitle">
          Explore our carefully designed event packages
        </p>

        {loading ? (
          <div className="packages-message">
            <p>Loading packages...</p>
          </div>
        ) : eventPackages.length === 0 ? (
          <div className="packages-message">
            <p>
              No packages available at the moment.
            </p>
          </div>
        ) : (
          <div className="packages-grid">
            {eventPackages.map((pkg, index) => (
              <motion.div
                key={pkg._id}
                className="service-package-card"
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

                <div className="service-package-image">
                  {pkg.image ? (
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                    />
                  ) : (
                    <div className="package-no-image">
                      No Image Available
                    </div>
                  )}

                  {/* OVERLAY */}

                  <div className="service-package-overlay">

                    {pkg.category && (
                      <span className="package-category">
                        {pkg.category}
                      </span>
                    )}

                    <h3>{pkg.name}</h3>

                    {/* BASIC DETAILS */}

                    <div className="package-summary">

                      <div className="package-summary-item">
                        <span>Price</span>

                        <strong>
                          LKR{' '}
                          {Number(
                            pkg.price || 0
                          ).toLocaleString()}
                        </strong>
                      </div>

                      <div className="package-summary-item">
                        <span>Duration</span>

                        <strong>
                          {pkg.duration || '—'}
                        </strong>
                      </div>

                      <div className="package-summary-item">
                        <span>Guests</span>

                        <strong>
                          {pkg.guests || '—'}
                        </strong>
                      </div>

                    </div>

                    {/* VIEW MORE */}

                    <button
                      type="button"
                      className="btn-view-package"
                      onClick={() =>
                        setSelectedPackage(pkg)
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

      {/* ================= PACKAGE DETAILS MODAL ================= */}

      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            className="package-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setSelectedPackage(null)
            }
          >
            <motion.div
              className="package-modal"
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

              {/* CLOSE BUTTON */}

              <button
                className="package-modal-close"
                onClick={() =>
                  setSelectedPackage(null)
                }
                aria-label="Close package details"
              >
                <Close />
              </button>

              {/* IMAGE */}

              <div className="package-modal-image">
                {selectedPackage.image ? (
                  <img
                    src={selectedPackage.image}
                    alt={selectedPackage.name}
                  />
                ) : (
                  <div className="package-no-image">
                    No Image Available
                  </div>
                )}
              </div>

              {/* DETAILS */}

              <div className="package-modal-content">

                {selectedPackage.category && (
                  <span className="modal-package-category">
                    {selectedPackage.category}
                  </span>
                )}

                <h2>
                  {selectedPackage.name}
                </h2>

                {/* DESCRIPTION */}

                {selectedPackage.description && (
                  <p className="modal-package-description">
                    {selectedPackage.description}
                  </p>
                )}

                {/* PACKAGE INFORMATION */}

                <div className="modal-package-info">

                  <div className="modal-info-item">
                    <span>Price</span>

                    <strong>
                      LKR{' '}
                      {Number(
                        selectedPackage.price || 0
                      ).toLocaleString()}
                    </strong>
                  </div>

                  <div className="modal-info-item">
                    <span>Duration</span>

                    <strong>
                      {selectedPackage.duration ||
                        '—'}
                    </strong>
                  </div>

                  <div className="modal-info-item">
                    <span>Guests</span>

                    <strong>
                      {selectedPackage.guests ||
                        '—'}
                    </strong>
                  </div>

                </div>

                {/* FEATURES */}

                <div className="modal-package-features">

                  <h3>
                    What's Included
                  </h3>

                  {selectedPackage.features &&
                  selectedPackage.features.length > 0 ? (
                    <ul>
                      {selectedPackage.features.map(
                        (feature, index) => (
                          <li key={index}>
                            <span>✓</span>
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>
                      Package details are
                      available upon request.
                    </p>
                  )}

                </div>

                {/* BOOK BUTTON */}

                <Link
                  to="/contact"
                  className="btn-book-package"
                  onClick={() =>
                    setSelectedPackage(null)
                  }
                >
                  Book This Package
                </Link>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CTA ================= */}

      <section className="services-book-cta">

        <motion.div
          className="services-cta-content"
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
            Ready to Book Your Package?
          </h2>

          <p>
            Contact us today and let's start
            planning your dream event
          </p>

          <Link
            to="/contact"
            className="btn btn-large"
          >
            Get in Touch
          </Link>

        </motion.div>

      </section>

      <Footer />
    </div>
  );
};

export default Services;