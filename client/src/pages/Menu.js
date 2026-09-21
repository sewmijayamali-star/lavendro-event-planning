import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Menu.css';

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/menus`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch menus');
      }

      const data = await response.json();

      console.log('Menus API response:', data);

      /*
        Backend response:

        {
          success: true,
          count: ...,
          menus: [...]
        }
      */

      const menuList = Array.isArray(data.menus)
        ? data.menus
        : [];

      // Only show active menus to customers
      const activeMenus = menuList.filter(
        (menu) => menu.isActive !== false
      );

      setMenus(activeMenus);
    } catch (error) {
      console.error('Error fetching menus:', error);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="menu-page">
      <Navbar />

      {/* ================= HERO ================= */}

      <section className="menu-hero">
        <motion.div
          className="menu-hero-content"
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
          <h1>Our Food Menus</h1>

          <p>
            Exquisite culinary experiences crafted for perfection
          </p>
        </motion.div>
      </section>

      {/* ================= MENU SECTION ================= */}

      <section className="menu-packages-section">

        <h2 className="section-title">
          Choose Your Perfect Menu
        </h2>

        <p className="section-subtitle">
          Click on any menu to view full details
        </p>

        {/* Loading */}

        {loading ? (
          <div
            style={{
              textAlign: 'center',
              padding: '50px'
            }}
          >
            <p>Loading menus...</p>
          </div>
        ) : menus.length === 0 ? (

          /* Empty */

          <div
            style={{
              textAlign: 'center',
              padding: '50px'
            }}
          >
            <p>
              No menus available at the moment.
            </p>
          </div>

        ) : (

          /* Menu Cards */

          <div className="menu-packages-grid">

            {menus.map((menu, index) => (

              <motion.div
                key={menu._id}
                className="menu-package-card"

                onClick={() =>
                  setSelectedMenu(menu)
                }

                whileHover={{
                  y: -10
                }}

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

                {/* Image */}

                <div className="menu-package-image">

                  {menu.image ? (
                    <img
                      src={menu.image}
                      alt={menu.name}
                    />
                  ) : (
                    <div className="menu-no-image">
                      No Image Available
                    </div>
                  )}

                  {/* Overlay */}

                  <div className="menu-package-overlay">

                    {menu.category && (
                      <span className="menu-category-label">
                        {menu.category}
                      </span>
                    )}

                    <h3>
                      {menu.name}
                    </h3>

                    <button
                      type="button"
                      className="btn-view-menu"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMenu(menu);
                      }}
                    >
                      View Full Menu
                    </button>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>
        )}

      </section>

      {/* ================= MENU DETAILS MODAL ================= */}

      <AnimatePresence>

        {selectedMenu && (

          <motion.div
            className="menu-modal-overlay"

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
              setSelectedMenu(null)
            }
          >

            <motion.div
              className="menu-modal"

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

              {/* Close */}

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedMenu(null)
                }
                aria-label="Close menu details"
              >
                <Close />
              </button>

              {/* Menu Image */}

              {selectedMenu.image && (
                <div className="menu-modal-image">
                  <img
                    src={selectedMenu.image}
                    alt={selectedMenu.name}
                  />
                </div>
              )}

              {/* Menu Title */}

              <div className="menu-modal-content">

                {selectedMenu.category && (
                  <span className="menu-modal-category">
                    {selectedMenu.category}
                  </span>
                )}

                <h2>
                  {selectedMenu.name}
                </h2>

                {/* Description */}

                {selectedMenu.description && (
                  <p className="menu-description">
                    {selectedMenu.description}
                  </p>
                )}

                {/* Price */}

                <div className="menu-price">

                  <span>
                    Price Per Person
                  </span>

                  <strong>
                    LKR{' '}
                    {Number(
                      selectedMenu.pricePerPerson || 0
                    ).toLocaleString()}
                  </strong>

                  <span>
                    / person
                  </span>

                </div>

                {/* Items */}

                <div className="menu-items-section">

                  <h3>
                    What's Included
                  </h3>

                  {Array.isArray(
                    selectedMenu.items
                  ) &&
                  selectedMenu.items.length > 0 ? (

                    <ul className="menu-items-list">

                      {selectedMenu.items.map(
                        (item, index) => (

                          <li key={index}>
                            <span>✓</span>
                            {item}
                          </li>

                        )
                      )}

                    </ul>

                  ) : (

                    <p>
                      Menu items are available
                      upon request.
                    </p>

                  )}

                </div>

                {/* Booking */}

                <Link
                  to="/contact"
                  className="btn-book-menu"
                  onClick={() =>
                    setSelectedMenu(null)
                  }
                >
                  Book This Menu
                </Link>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* ================= CTA ================= */}

      <section className="menu-book-cta">

        <motion.div
          className="menu-cta-content"

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
            Ready to Book Your Menu?
          </h2>

          <p>
            Contact us to customize your perfect
            dining experience
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

export default Menu;