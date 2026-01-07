import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Phone, Email, LocationOn, Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import Footer from '../components/Footer';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Thank you for contacting us! We will get back to you soon. ✅');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <Navbar />
      
      <section className="contact-hero">
        <motion.div 
          className="contact-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Get in Touch</h1>
          <p>Let's start planning your dream event together</p>
        </motion.div>
      </section>

      <section className="contact-main-section">
        <div className="contact-container">
        
          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+94 123 456 789"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Event Type *</label>
                <select 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Event Type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us about your event..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          <motion.div 
            className="contact-info-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Contact Information</h2>
            
            <div className="contact-info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <Phone />
                </div>
                <div className="info-details">
                  <h3>Phone</h3>
                  <p>+94 123 456 789</p>
                  <p>+94 987 654 321</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Email />
                </div>
                <div className="info-details">
                  <h3>Email</h3>
                  <p>info@lavendro.com</p>
                  <p>events@lavendro.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <LocationOn />
                </div>
                <div className="info-details">
                  <h3>Address</h3>
                  <p>123 Event Avenue</p>
                  <p>Negombo, Western Province, LK</p>
                </div>
              </div>
            </div>

            <div className="social-media">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon"><Facebook /></a>
                <a href="#" className="social-icon"><Instagram /></a>
                <a href="#" className="social-icon"><Twitter /></a>
                <a href="#" className="social-icon"><LinkedIn /></a>
              </div>
            </div>

            <div className="business-hours">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: By Appointment</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="map-section">
        <motion.div 
          className="map-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <iframe
            title="Lavendro Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.81222073434!2d79.83267!3d7.20889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2ee9c6bb2f73b%3A0xa51626e908186f3e!2sNegombo!5e0!3m2!1sen!2slk!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: '20px' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
