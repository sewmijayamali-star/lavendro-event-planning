import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleGetStarted = () => {
    if (user) {
      navigate('/services');
    } else {
      navigate('/signup');
    }
  };

  const eventTypes = [
    { 
      name: 'Weddings', 
      icon: '💒',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600'
    },
    { 
      name: 'Birthdays', 
      icon: '🎂',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600'
    },
    { 
      name: 'Corporate Events', 
      icon: '🏢',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600'
    },
    { 
      name: 'Anniversaries', 
      icon: '💍',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600'
    }
  ];

  const planningSteps = [
    { step: 1, title: 'Consultation', desc: 'Discuss your vision and requirements with our expert team' },
    { step: 2, title: 'Planning', desc: 'Create detailed event blueprint tailored to your needs' },
    { step: 3, title: 'Execution', desc: 'Bring your dream event to life with precision' },
    { step: 4, title: 'Celebration', desc: 'Enjoy your perfect, stress-free event' }
  ];

  const whyChooseUs = [
    { icon: '👥', title: 'Expert Team', desc: 'Professional event planners with 10+ years of experience' },
    { icon: '🎨', title: 'Custom Packages', desc: 'Tailored solutions for every budget and style' },
    { icon: '⭐', title: 'Quality Service', desc: 'Attention to detail in every aspect of your event' },
    { icon: '🕐', title: '24/7 Support', desc: 'Always available for your needs and queries' }
  ];

  return (
    <div className="home">
      <Navbar />
      
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Welcome to Lavendro
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Creating Unforgettable Moments, One Event at a Time
          </motion.p>
          <motion.div 
            className="hero-buttons"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <button onClick={handleGetStarted} className="btn btn-primary">
              Get Started
            </button>
            <Link to="/about" className="btn btn-secondary">
              I'm a Planner
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <section className="event-types-section">
        <h2 className="section-title">Event Types We Specialize In</h2>
        <p className="section-subtitle">From intimate gatherings to grand celebrations</p>
        <div className="event-types-grid">
          {eventTypes.map((event, index) => (
            <motion.div 
              key={index}
              className="event-card"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img src={event.image} alt={event.name} className="event-card-image" />
              <div className="event-card-content">
                <div className="event-icon">{event.icon}</div>
                <h3>{event.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="menus-section">
        <h2 className="section-title">Our Exquisite Menus</h2>
        <p className="section-subtitle">Culinary experiences that delight every palate</p>
        <div className="menus-grid">
          <motion.div 
            className="menu-card"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="menu-card-overlay">
              <h3>Royal Feast</h3>
              <p>Premium gourmet selection for luxury events</p>
              <Link to="/menu" className="btn-link">Explore Menu</Link>
            </div>
          </motion.div>
          <motion.div 
            className="menu-card"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="menu-card-overlay">
              <h3>Golden Delight</h3>
              <p>Classic favorites with a modern twist</p>
              <Link to="/menu" className="btn-link">Explore Menu</Link>
            </div>
          </motion.div>
          <motion.div 
            className="menu-card"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="menu-card-overlay">
              <h3>Essential Party</h3>
              <p>Perfect starters for any celebration</p>
              <Link to="/menu" className="btn-link">Explore Menu</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="planning-steps-section">
        <h2 className="section-title">Our Planning Process</h2>
        <p className="section-subtitle">Simple steps to your perfect event</p>
        <div className="steps-container">
          {planningSteps.map((item, index) => (
            <motion.div 
              key={index}
              className="step-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="step-number">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about-preview-section">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>About Lavendro</h2>
          <p>
            With over a decade of experience in event planning, Lavendro has been creating 
            magical moments and unforgettable experiences. Our dedicated team of professionals 
            brings creativity, precision, and passion to every event we organize. From intimate 
            gatherings to grand celebrations, we make your dreams come true.
          </p>
          <Link to="/about" className="btn btn-primary">Discover Our Story</Link>
        </motion.div>
      </section>

      <section className="success-section">
        <h2 className="section-title">Success in Numbers</h2>
        <p className="section-subtitle">Proven excellence across hundreds of events</p>
        <div className="stats-grid">
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3>500+</h3>
            <p>Events Organized</p>
          </motion.div>
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3>1000+</h3>
            <p>Happy Clients</p>
          </motion.div>
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3>50+</h3>
            <p>Expert Team Members</p>
          </motion.div>
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3>10+</h3>
            <p>Years of Experience</p>
          </motion.div>
        </div>
      </section>
   <section className="why-choose-section">
        <h2 className="section-title">Why Choose Lavendro</h2>
        <p className="section-subtitle">Experience the difference with our exceptional service</p>
        <div className="features-grid">
          {whyChooseUs.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      <section className="contact-cta-section">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Plan Your Dream Event?</h2>
          <p>Let's create something extraordinary together</p>
          <Link to="/contact" className="btn btn-large">Contact Us Today</Link>
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
