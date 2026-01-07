import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Venues.css';

const Venues = () => {
  const indoorVenues = [
    {
  name: 'Grand Ballroom',
  capacity: '500 guests',
  description: 'Elegant ballroom with crystal chandeliers and premium sound system',
  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'
},
    {
      name: 'Luxury Banquet Hall',
      capacity: '300 guests',
      description: 'Modern venue with state-of-the-art lighting and audio equipment',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800'
    },
    {
      name: 'Classic Conference Center',
      capacity: '200 guests',
      description: 'Perfect for corporate events and professional gatherings',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800'
    },
    {
      name: 'Intimate Function Room',
      capacity: '100 guests',
      description: 'Cozy space ideal for private celebrations and small gatherings',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800'
    },
    {
      name: 'Royal Heritage Hall',
      capacity: '600 guests',
      description: 'Majestic colonial architecture with vintage charm and grand staircase',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
    },
    {
      name: 'Contemporary Studio Space',
      capacity: '150 guests',
      description: 'Minimalist industrial design perfect for modern celebrations and art exhibitions',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    }
  ];

  const outdoorVenues = [
    {
      name: 'Garden Paradise',
      capacity: '400 guests',
      description: 'Beautiful garden setting with natural landscape and fountain',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800'
    },
    {
      name: 'Beachfront Venue',
      capacity: '350 guests',
      description: 'Stunning ocean views with sunset ceremony options',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800'
    },
    {
      name: 'Rooftop Terrace',
      capacity: '250 guests',
      description: 'Panoramic city views with modern outdoor amenities',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'
    },
    {
      name: 'Vineyard Estate',
      capacity: '300 guests',
      description: 'Rustic charm with rolling hills and wine country ambiance',
      image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800'
    },
    {
      name: 'Lakeside Pavilion',
      capacity: '450 guests',
      description: 'Serene waterfront location with covered pavilion and scenic lake views',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800'
    },
    {
      name: 'Mountain Resort Deck',
      capacity: '200 guests',
      description: 'Elevated wooden deck surrounded by lush mountains and natural beauty',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    }
  ];

  return (
    <div className="venues-page">
      <Navbar />
      
      
      <section className="venues-hero">
        <motion.div 
          className="venues-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Our Stunning Venues</h1>
          <p>Perfect spaces for your perfect moments</p>
        </motion.div>
      </section>

      <section className="venues-section">
        <h2 className="section-title">Indoor Venues</h2>
        <p className="section-subtitle">Elegant indoor spaces with modern amenities</p>
        
        <div className="venues-grid">
          {indoorVenues.map((venue, index) => (
            <motion.div 
              key={index}
              className="venue-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="venue-image">
                <img src={venue.image} alt={venue.name} />
                <div className="venue-overlay">
                  <div className="venue-capacity">{venue.capacity}</div>
                </div>
              </div>
              <div className="venue-content">
                <h3>{venue.name}</h3>
                <p>{venue.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="venues-section outdoor-section">
        <h2 className="section-title">Outdoor Venues</h2>
        <p className="section-subtitle">Breathtaking outdoor locations for memorable events</p>
        
        <div className="venues-grid">
          {outdoorVenues.map((venue, index) => (
            <motion.div 
              key={index}
              className="venue-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="venue-image">
                <img src={venue.image} alt={venue.name} />
                <div className="venue-overlay">
                  <div className="venue-capacity">{venue.capacity}</div>
                </div>
              </div>
              <div className="venue-content">
                <h3>{venue.name}</h3>
                <p>{venue.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="venue-book-cta">
        <motion.div 
          className="venue-cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Book Your Perfect Venue</h2>
          <p>Contact us to schedule a site visit and reserve your date</p>
          <Link to="/contact" className="btn btn-large">Contact Us</Link>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default Venues;
