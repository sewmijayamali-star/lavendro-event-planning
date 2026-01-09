import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Close } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Dashboard.css';

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
    phone: "N/A",
    role: "user"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      if (!storedUser.role) {
        storedUser.role = 'user';
      }
      setUser(storedUser);
      setFormData(storedUser);
    }
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/inquiries`);

      const data = await response.json();
      
      const storedUser = JSON.parse(localStorage.getItem('user'));
      
      if (storedUser?.role === 'admin') {
        setInquiries(data);
      } else {
        const userInquiries = data.filter(inq => inq.email === storedUser?.email);
        setInquiries(userInquiries);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleViewConversation = async (inquiry) => {
    try {
      console.log('Clicking inquiry:', inquiry); // Debug log
      console.log('Inquiry ID:', inquiry._id); // Debug log
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/inquiries/${inquiry._id}`);

      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('Fetched inquiry data:', data); // Debug log
      console.log('Conversation length:', data.conversation?.length); // Debug log
      
      setSelectedInquiry(data);
    } catch (error) {
      console.error('Error fetching conversation:', error);
      alert('Failed to load conversation. Please try again.');
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return;
    
    // CRITICAL CHECK: Verify inquiry ID exists
    if (!selectedInquiry || !selectedInquiry._id) {
      console.error('ERROR: No inquiry selected or missing ID');
      console.log('Selected Inquiry:', selectedInquiry);
      alert('Error: Cannot send message. Inquiry ID is missing.');
      return;
    }
    
    setSendingReply(true);
    
    try {
      const senderType = user.role === 'admin' ? 'admin' : 'user';
      
      console.log('=== SENDING REPLY ===');
      console.log('Inquiry ID:', selectedInquiry._id);
      console.log('Sender:', senderType);
      console.log('Message:', replyMessage);
      console.log('URL:', `${process.env.REACT_APP_API_URL}/api/inquiries/${selectedInquiry._id}/reply`);
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/inquiries/${selectedInquiry._id}/reply`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sender: senderType,
          message: replyMessage 
        })
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to send message');
      }
      
      const updatedInquiry = await response.json();
      console.log('✅ Reply sent successfully');
      console.log('Updated conversation:', updatedInquiry.conversation);
      
      setSelectedInquiry(updatedInquiry);
      setReplyMessage('');
      fetchInquiries();
      
    } catch (error) {
      console.error('❌ Error sending reply:', error);
      alert(`Failed to send message: ${error.message}`);
    } finally {
      setSendingReply(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
    alert("Profile Updated Successfully! ✅");
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        <motion.div 
          className="profile-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Welcome Back, {user.name.split(' ')[0]}</h1>
          <p>Manage your account and track your events</p>
        </motion.div>

        <div className="profile-content-grid">
          
          <motion.div 
            className="profile-card user-identity-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="profile-photo-container">
              <div className="profile-photo">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            
            <div className="user-details">
              {isEditing ? (
                <div className="edit-form-group">
                   <input 
                     type="text" 
                     name="name" 
                     value={formData.name} 
                     onChange={handleChange} 
                     className="edit-input"
                     placeholder="Full Name"
                   />
                </div>
              ) : (
                <>
                  <h2>{user.name}</h2>
                  <p className="user-role">
                    {user.role === 'admin' ? 'Administrator' : 'Event Organizer'}
                  </p>
                </>
              )}
              
              <div className="info-row">
                <span className="info-label">Email:</span>
                {isEditing ? (
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    className="edit-input small"
                  />
                ) : (
                  <span className="info-value">{user.email}</span>
                )}
              </div>

              <div className="info-row">
                <span className="info-label">Phone:</span>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    className="edit-input small"
                    placeholder="+94..."
                  />
                ) : (
                  <span className="info-value">{user.phone || "Not Set"}</span>
                )}
              </div>
            </div>

            <div className="card-actions">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="btn btn-save">Save Changes</button>
                  <button onClick={handleCancel} className="btn btn-outline" style={{borderColor: '#ccc', color: '#666'}}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsEditing(true)} className="btn btn-outline">Edit Profile</button>
                  <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </>
              )}
            </div>
          </motion.div>

          <motion.div 
            className="profile-card dashboard-status-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3>
              {user.role === 'admin' ? 'Customer Inquiries' : 'My Inquiries'}
            </h3>
            <div className="events-list">
              {loadingInquiries ? (
                <p>Loading inquiries...</p>
              ) : inquiries.length > 0 ? (
                inquiries.map((inquiry) => (
                  <div 
                    key={inquiry._id} 
                    className="event-item inquiry-item"
                    onClick={() => handleViewConversation(inquiry)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="event-icon">📧</div>
                    <div className="event-info">
                      <h4>{inquiry.name}</h4>
                      <span>{inquiry.subject} • {inquiry.email}</span>
                      <p className="inquiry-message">{inquiry.message.substring(0, 80)}...</p>
                    </div>
                    <span className={`status-badge ${inquiry.status.toLowerCase()}`}>
                      {inquiry.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="no-events">
                  <p>
                    {user.role === 'admin' 
                      ? 'No inquiries yet.' 
                      : 'You have not submitted any inquiries yet.'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>

      <AnimatePresence>
        {selectedInquiry && (
          <motion.div 
            className="chat-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedInquiry(null)}
          >
            <motion.div 
              className="chat-modal-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="chat-modal-header">
                <div>
                  <h3>{selectedInquiry.name}</h3>
                  <p>{selectedInquiry.subject} • {selectedInquiry.email}</p>
                </div>
                <button onClick={() => setSelectedInquiry(null)} className="chat-close-btn">
                  <Close />
                </button>
              </div>

              <div className="chat-messages-area">
                {selectedInquiry.conversation && selectedInquiry.conversation.length > 0 ? (
                  selectedInquiry.conversation.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`chat-bubble ${msg.sender === 'admin' ? 'admin-bubble' : 'user-bubble'}`}
                    >
                      <p>{msg.message}</p>
                      <span className="chat-time">
                        {new Date(msg.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div style={{
                    textAlign: 'center', 
                    padding: '40px 20px', 
                    color: '#999',
                    fontSize: '0.95rem'
                  }}>
                    <p>📭 No messages yet.</p>
                    <p style={{fontSize: '0.85rem', marginTop: '10px'}}>
                      Start the conversation below!
                    </p>
                  </div>
                )}
              </div>

              <div className="chat-input-box">
                <input 
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder={user.role === 'admin' ? 'Type your reply...' : 'Type your message...'}
                  onKeyPress={(e) => e.key === 'Enter' && !sendingReply && handleSendReply()}
                  disabled={sendingReply}
                />
                <button 
                  onClick={handleSendReply}
                  disabled={sendingReply || !replyMessage.trim()}
                >
                  <Send />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Profile;
