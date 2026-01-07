const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Received inquiry:', req.body); 
    const inquiryData = {
      ...req.body,
      conversation: [{
        sender: 'user', 
        message: req.body.message,
        timestamp: new Date()
      }]
    };
    
    const inquiry = new Inquiry(inquiryData);
    await inquiry.save();
    
    console.log('✅ Inquiry created successfully:', inquiry._id);
    
    res.status(201).json({ message: 'Inquiry submitted successfully!' });
  } catch (error) {
    console.error('❌ Error creating inquiry:', error);
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/reply', async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    
    console.log('Adding reply as:', req.body.sender);
    
    inquiry.conversation.push({
      sender: req.body.sender || 'admin',
      message: req.body.message,
      timestamp: new Date()
    });
    
    inquiry.status = 'Replied';
    await inquiry.save();
    
    console.log('✅ Reply added successfully');
    
    res.json(inquiry);
  } catch (error) {
    console.error('❌ Error adding reply:', error);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    
    console.log('Fetched inquiry:', req.params.id);
    console.log('Conversation length:', inquiry.conversation?.length);
    
    res.json(inquiry);
  } catch (error) {
    console.error('❌ Error fetching inquiry:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
