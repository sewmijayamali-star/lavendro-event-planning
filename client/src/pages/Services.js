import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Services.css';

const Services = () => {
  const [eventPackages, setEventPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/packages');
      const data = await response.json();
      setEventPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="services-page">
      <Navbar />
      
      <section className="services-hero">
        <motion.div 
          className="services-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Our Services & Packages</h1>
          <p>Tailored solutions for your perfect celebration</p>
        </motion.div>
      </section>

      <section className="packages-section">
        <h2 className="section-title">Event Packages</h2>
        <p className="section-subtitle">From weddings to corporate events, we've got you covered</p>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Loading packages...</p>
          </div>
        ) : eventPackages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>No packages available at the moment.</p>
          </div>
        ) : (
          <div className="packages-grid">
            {eventPackages.map((pkg, index) => (
              <motion.div 
                key={pkg._id}
                className={`package-card ${pkg.popular ? 'popular' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -15 }}
              >
                {pkg.popular && <div className="popular-badge">⭐ Popular</div>}
                <div className="package-image">
                  <img src={pkg.image} alt={pkg.name} />
                </div>
                <div className="package-content">
                  <h3>{pkg.name}</h3>
                  <div className="package-price">{pkg.price}</div>
                  <ul className="package-features">
                    {pkg.features.map((feature, i) => (
                      <li key={i}>
                        <span className="checkmark">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-package">Book This Package</Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="book-cta-section">
        <motion.div 
          className="book-cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Book Your Package?</h2>
          <p>Contact us today and let's start planning your dream event</p>
          <Link to="/contact" className="btn btn-large">Get in Touch</Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
