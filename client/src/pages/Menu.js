import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Close } from '@mui/icons-material';
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
      const response = await fetch('http://localhost:5000/api/menus');
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error('Error fetching menus:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="menu-page">
      <Navbar />
      
      <section className="menu-hero">
        <motion.div 
          className="menu-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Our Food Menus</h1>
          <p>Exquisite culinary experiences crafted for perfection</p>
        </motion.div>
      </section>

      <section className="menu-packages-section">
        <h2 className="section-title">Choose Your Perfect Menu</h2>
        <p className="section-subtitle">Click on any menu to view full details</p>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Loading menus...</p>
          </div>
        ) : menus.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>No menus available at the moment.</p>
          </div>
        ) : (
          <div className="menu-packages-grid">
            {menus.map((menu, index) => (
              <motion.div 
                key={menu._id}
                className="menu-package-card"
                onClick={() => setSelectedMenu(menu)}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="menu-package-image">
                  <img src={menu.image} alt={menu.name} />
                  <div className="menu-package-overlay">
                    <h3>{menu.name}</h3>
                    <button className="btn-view-menu">View Full Menu</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {selectedMenu && (
          <motion.div 
            className="menu-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMenu(null)}
          >
            <motion.div 
              className="menu-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedMenu(null)}>
                <Close />
              </button>
              
              <h2>{selectedMenu.name}</h2>
              
              <div className="menu-categories">
                {selectedMenu.categories && Object.entries(selectedMenu.categories).map(([category, items]) => (
                  <div key={category} className="menu-category">
                    <h3>{category}</h3>
                    <ul>
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="menu-book-cta">
        <motion.div 
          className="menu-cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Book Your Menu?</h2>
          <p>Contact us to customize your perfect dining experience</p>
          <Link to="/contact" className="btn btn-large">Contact Us</Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
