import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/About.css';

const About = () => {
  const team = [
    { 
      name: 'Sewmini Samarasinghe', 
      role: 'Founder & CEO',
      image: '/images/team/Sewmini.jpg',
      
    },
    { 
      name: 'Shanoli Dhanushri', 
      role: 'Creative Director',
      image: '/images/team/Shanoli.jpg',
    },
    { 
      name: 'Vishmi Vinodhya', 
      role: 'Event Coordinator',
      image: '/images/team/Vishmi.jpg',
    },
    { 
      name: 'Rangana Prasad', 
      role: 'Venue Specialist',
      image: '/images/team/Rangana.jpg',
    },
    { 
      name: 'Hashini Imasha', 
      role: 'Catering Manager',

      image: '/images/team/Hashini.jpg',
    }
  ];

  const values = [
    { icon: '💎', title: 'Excellence', desc: 'We strive for perfection in every detail' },
    { icon: '🤝', title: 'Trust', desc: 'Building lasting relationships with our clients' },
    { icon: '🎨', title: 'Creativity', desc: 'Innovative solutions for unique events' },
    { icon: '❤️', title: 'Passion', desc: 'Love for what we do drives our success' }
  ];

  return (
    <div className="about-page">
      <Navbar />
      
      <section className="about-hero">
        <motion.div 
          className="about-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>About Lavendro</h1>
          <p>Crafting Dreams Into Reality Since 2015</p>
        </motion.div>
      </section>

      <section className="our-story-section">
        <div className="story-container">
          <motion.div 
            className="story-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800" alt="Our Story" />
          </motion.div>
          <motion.div 
            className="story-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Our Story</h2>
            <p>
              Lavendro began with a simple dream: to create unforgettable experiences that bring people together. 
              Founded in 2015, we started as a small team of passionate event enthusiasts who believed that every 
              celebration deserves to be extraordinary.
            </p>
            <p>
              Over the years, we've grown into a leading event planning company, but our core values remain unchanged. 
              We treat every event as if it were our own, pouring creativity, dedication, and heart into making your 
              special moments truly magical.
            </p>
            <p>
              Today, we're proud to have organized over 500 successful events, from intimate gatherings to grand 
              celebrations, each one unique and memorable in its own way.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mission-vision-section">
        <div className="mv-grid">
          <motion.div 
            className="mv-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mv-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To deliver exceptional event planning services that exceed expectations, creating 
              memorable experiences through meticulous attention to detail, innovative design, 
              and personalized service.
            </p>
          </motion.div>
          <motion.div 
            className="mv-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mv-icon">🌟</div>
            <h3>Our Vision</h3>
            <p>
              To be the most trusted and innovative event planning company, recognized for 
              transforming ordinary moments into extraordinary celebrations that leave lasting 
              impressions for years to come.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="values-section">
        <h2 className="section-title">Our Core Values</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <motion.div 
              key={index}
              className="value-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="team-section">
        <h2 className="section-title">Meet Our Expert Team</h2>
        <p className="section-subtitle">Passionate professionals dedicated to your success</p>
        <div className="team-grid">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              className="team-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="team-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

  
      <section className="work-cta-section">
        <motion.div 
          className="work-cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Want to Work With Us?</h2>
          <p>Join our team of passionate event professionals or partner with us for your next event</p>
          <Link to="/contact" className="btn btn-large">Get in Touch</Link>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
