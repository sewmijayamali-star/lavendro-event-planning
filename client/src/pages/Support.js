import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Support.css';

const Support = () => {
  const reasons = [
    {
      icon: '🌟',
      title: 'Community Growth',
      description: 'Your support helps us expand our services and reach more communities, creating jobs and opportunities.'
    },
    {
      icon: '💼',
      title: 'Quality Enhancement',
      description: 'Contributions enable us to upgrade our facilities, equipment, and training programs for better service.'
    },
    {
      icon: '🎓',
      title: 'Education & Training',
      description: 'We invest in training programs for aspiring event planners and hospitality professionals.'
    },
    {
      icon: '🤝',
      title: 'Social Impact',
      description: 'Supporting charitable events and community initiatives at reduced or no cost.'
    }
  ];

  const sponsorshipLevels = [
    {
      level: 'Platinum Sponsor',
      amount: 'LKR 1,000,000+',
      benefits: [
        'Premier logo placement on all marketing materials',
        'VIP access to all Lavendro events',
        'Dedicated feature in annual report',
        'Exclusive partnership opportunities',
        'Social media recognition campaign'
      ],
      color: 'platinum'
    },
    {
      level: 'Gold Sponsor',
      amount: 'LKR 500,000 - 999,999',
      benefits: [
        'Logo on website and major events',
        'Recognition in quarterly newsletters',
        'Invitation to exclusive networking events',
        'Social media mentions',
        'Annual appreciation certificate'
      ],
      color: 'gold'
    },
    {
      level: 'Silver Sponsor',
      amount: 'LKR 250,000 - 499,999',
      benefits: [
        'Logo on website sponsor page',
        'Recognition at sponsored events',
        'Newsletter mentions',
        'Appreciation certificate'
      ],
      color: 'silver'
    },
    {
      level: 'Bronze Sponsor',
      amount: 'LKR 100,000 - 249,999',
      benefits: [
        'Name listing on website',
        'Recognition at events',
        'Thank you certificate'
      ],
      color: 'bronze'
    }
  ];

  return (
    <div className="support-page">
      <Navbar />
      

      <section className="support-hero">
        <motion.div 
          className="support-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Support Lavendro</h1>
          <p>Join us in creating unforgettable moments for everyone</p>
        </motion.div>
      </section>

      <section className="why-support-section">
        <h2 className="section-title">Why Support Us?</h2>
        <p className="section-subtitle">Your contribution makes a real difference</p>
        
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              className="reason-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="reason-icon">{reason.icon}</div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="sponsorship-section">
        <h2 className="section-title">Sponsorship Opportunities</h2>
        <p className="section-subtitle">Choose a level that works for you</p>
        
        <div className="sponsorship-grid">
          {sponsorshipLevels.map((sponsor, index) => (
            <motion.div 
              key={index}
              className={`sponsorship-card ${sponsor.color}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
            >
              <div className="sponsor-header">
                <h3>{sponsor.level}</h3>
                <div className="sponsor-amount">{sponsor.amount}</div>
              </div>
              <ul className="sponsor-benefits">
                {sponsor.benefits.map((benefit, i) => (
                  <li key={i}>
                    <span className="benefit-check">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-sponsor">Become a Sponsor</Link>
            </motion.div>
          ))}
        </div>
      </section>

     
      <section className="support-cta-section">
        <motion.div 
          className="support-cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Make an Impact?</h2>
          <p>Contact us to discuss how we can work together to create meaningful experiences</p>
          <Link to="/contact" className="btn btn-large">Get in Touch</Link>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default Support;
