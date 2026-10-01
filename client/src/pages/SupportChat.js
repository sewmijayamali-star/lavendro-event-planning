import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

import {
  ArrowBack,
  Send,
  SupportAgent,
  Close,
  CheckCircle
  
} from '@mui/icons-material';

import '../styles/SupportChat.css';

const SupportChat = () => {
  const navigate = useNavigate();

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const [messageText, setMessageText] = useState('');

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState('');

  // ==========================================
  // LOAD MESSAGES
  // ==========================================
  const loadMessages = useCallback(async (conversationId) => {
    try {

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/support/conversations/${conversationId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessages(response.data.messages || []);

    } catch (error) {

      console.error(
        'Load messages error:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Unable to load messages.'
      );
    }
  }, [token]);


  // ==========================================
  // GET LOGGED-IN USER
  // ==========================================
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!storedToken || !storedUser) {
      navigate('/login', {
        state: {
          from: '/support/chat'
        }
      });

      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      setToken(storedToken);
      setUser(parsedUser);
    } catch (error) {
      console.error('Invalid stored user:', error);

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      navigate('/login', {
        state: {
          from: '/support/chat'
        }
      });
    }
  }, [navigate]);


  // ==========================================
  // LOAD CUSTOMER CONVERSATION
  // ==========================================
  useEffect(() => {
    if (!token) return;

    const loadConversation = async () => {
      try {
        setLoading(true);
        setError('');

        /*
         * Your backend:
         *
         * GET /api/support/conversations/me
         */

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/support/conversations/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const conversationData = response.data.conversation;

        setConversation(conversationData);

        // Load previous messages
        await loadMessages(conversationData._id);

      } catch (error) {

        /*
         * 404 means:
         * Customer does not have an active conversation.
         *
         * This is NOT an actual error for our UI.
         */

        if (error.response?.status === 404) {
          setConversation(null);
          setMessages([]);
        } else {
          console.error(
            'Load conversation error:',
            error
          );

          setError(
            error.response?.data?.message ||
            'Unable to load your support conversation.'
          );
        }

      } finally {
        setLoading(false);
      }
    };

    loadConversation();

  }, [token, loadMessages]);


  // ==========================================
  // SOCKET.IO
  // ==========================================
  useEffect(() => {

    if (!conversation?._id) return;

    /*
     * Connect to your Express + Socket.IO server.
     */

    const socket = io(
      process.env.REACT_APP_API_URL,
      {
        transports: ['websocket', 'polling']
      }
    );

    socketRef.current = socket;

    // ------------------------------------------
    // SOCKET CONNECTED
    // ------------------------------------------

    socket.on('connect', () => {

      console.log(
        'Connected to Lavendro Support Socket:',
        socket.id
      );

      /*
       * Your server:
       *
       * socket.on('join_conversation', ...)
       */

      socket.emit(
        'join_conversation',
        conversation._id
      );
    });


    // ------------------------------------------
    // RECEIVE MESSAGE
    // ------------------------------------------

    /*
     * Your backend emits:
     *
     * receive_message
     */

    socket.on(
      'receive_message',
      (newMessage) => {

        console.log(
          'New support message:',
          newMessage
        );

        setMessages((previousMessages) => {

          /*
           * Prevent duplicate messages.
           */

          const exists = previousMessages.some(
            (message) =>
              message._id === newMessage._id
          );

          if (exists) {
            return previousMessages;
          }

          return [
            ...previousMessages,
            newMessage
          ];
        });
      }
    );


    // ------------------------------------------
    // SOCKET ERROR
    // ------------------------------------------

    socket.on('connect_error', (error) => {

      console.error(
        'Socket connection error:',
        error
      );
    });


    // ------------------------------------------
    // CLEANUP
    // ------------------------------------------

    return () => {

      console.log(
        'Disconnecting support socket...'
      );

      socket.disconnect();

      socketRef.current = null;
    };

  }, [conversation?._id]);


  // ==========================================
  // AUTO SCROLL
  // ==========================================
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });

  }, [messages]);


  // ==========================================
  // CREATE CONVERSATION
  // ==========================================
  const createConversation = async () => {

    try {

      setError('');

      /*
       * Your backend:
       *
       * POST /api/support/conversations
       */

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/support/conversations`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const newConversation =
        response.data.conversation;

      setConversation(newConversation);

      setMessages([]);

      return newConversation;

    } catch (error) {

      console.error(
        'Create conversation error:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Unable to start the support conversation.'
      );

      return null;
    }
  };


  // ==========================================
  // SEND MESSAGE
  // ==========================================
  const handleSendMessage = async (e) => {

    e.preventDefault();

    const trimmedMessage =
      messageText.trim();

    if (!trimmedMessage || sending) {
      return;
    }

    try {

      setSending(true);
      setError('');

      let activeConversation =
        conversation;


      // ----------------------------------------
      // CREATE CONVERSATION IF NEEDED
      // ----------------------------------------

      if (!activeConversation) {

        activeConversation =
          await createConversation();

        if (!activeConversation) {
          return;
        }
      }


      // ----------------------------------------
      // SEND MESSAGE
      // ----------------------------------------

      /*
       * Your backend:
       *
       * POST
       * /api/support/conversations/:id/messages
       */

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/support/conversations/${activeConversation._id}/messages`,
        {
          message: trimmedMessage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const sentMessage =
        response.data.data;


      /*
       * The backend also emits the message
       * through Socket.IO.
       *
       * Therefore check for duplicates
       * before adding it locally.
       */

      setMessages((previousMessages) => {

        const exists =
          previousMessages.some(
            (message) =>
              message._id === sentMessage._id
          );

        if (exists) {
          return previousMessages;
        }

        return [
          ...previousMessages,
          sentMessage
        ];
      });


      setMessageText('');

    } catch (error) {

      console.error(
        'Send message error:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Unable to send your message.'
      );

    } finally {

      setSending(false);
    }
  };


  // ==========================================
  // ENTER KEY
  // ==========================================
  const handleKeyDown = (e) => {

    if (
      e.key === 'Enter' &&
      !e.shiftKey
    ) {

      e.preventDefault();

      handleSendMessage(e);
    }
  };


  // ==========================================
  // QUICK MESSAGE
  // ==========================================
  const setQuickMessage = (message) => {

    setMessageText(message);
  };


  // ==========================================
  // FORMAT TIME
  // ==========================================
  const formatTime = (date) => {

    if (!date) return '';

    return new Date(date).toLocaleTimeString(
      [],
      {
        hour: '2-digit',
        minute: '2-digit'
      }
    );
  };


  // ==========================================
  // LOADING SCREEN
  // ==========================================
  if (loading) {

    return (
      <div className="support-chat-loading">

        <div className="support-chat-spinner"></div>

        <p>
          Connecting to Lavendro Support...
        </p>

      </div>
    );
  }


  // ==========================================
  // MAIN PAGE
  // ==========================================
  return (

    <div className="support-chat-page">


      {/* ======================================
          HEADER
      ====================================== */}

      <header className="support-chat-navbar">

        <div className="support-chat-navbar-inner">

          <Link
            to="/support"
            className="support-chat-back"
          >
            <ArrowBack />

            <span>
              Back to Support
            </span>
          </Link>


          <Link
            to="/"
            className="support-chat-logo"
          >
            Lavendro
          </Link>


          <div className="support-chat-user">

            <span>
              {user?.fullName || 'Customer'}
            </span>

          </div>

        </div>

      </header>


      {/* ======================================
          CHAT CONTAINER
      ====================================== */}

      <main className="support-chat-main">

        <div className="support-chat-container">


          {/* ====================================
              CHAT HEADER
          ==================================== */}

          <div className="support-chat-header">

            <div className="support-agent-icon">

              <SupportAgent />

            </div>


            <div className="support-chat-header-info">

              <h1>
                Lavendro Support
              </h1>

              <div className="support-chat-status">

                <span className="online-dot"></span>

                {conversation?.assignedSupport
                  ? `Connected with ${conversation.assignedSupport.fullName}`
                  : 'Support team is available'}

              </div>

            </div>


            <div className="support-chat-live">

              <span></span>

              Live Support

            </div>

          </div>


          {/* ====================================
              ERROR
          ==================================== */}

          {error && (

            <div className="support-chat-error">

              <span>
                {error}
              </span>

              <button
                type="button"
                onClick={() => setError('')}
              >
                <Close />
              </button>

            </div>

          )}


          {/* ====================================
              MESSAGES AREA
          ==================================== */}

          <div className="support-chat-messages">


            {/* ----------------------------------
                NO CONVERSATION
            ---------------------------------- */}

            {!conversation && messages.length === 0 && (

              <div className="support-chat-empty">

                <div className="support-empty-icon">

                  <SupportAgent />

                </div>

                <h2>
                  How can we help you?
                </h2>

                <p>
                  Start a conversation with
                  the Lavendro support team.
                </p>


                <div className="support-quick-actions">

                  <button
                    type="button"
                    onClick={() =>
                      setQuickMessage(
                        'I need help with an event booking.'
                      )
                    }
                  >
                    Event Booking
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setQuickMessage(
                        'I have a question about your packages.'
                      )
                    }
                  >
                    Packages
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setQuickMessage(
                        'I have a question about payment.'
                      )
                    }
                  >
                    Payments
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setQuickMessage(
                        'I need help with my account.'
                      )
                    }
                  >
                    Account Help
                  </button>

                </div>

              </div>

            )}


            {/* ----------------------------------
                EXISTING CONVERSATION
            ---------------------------------- */}

            {conversation &&
              messages.length === 0 && (

                <div className="support-chat-empty">

                  <div className="support-empty-icon">

                    <CheckCircle />

                  </div>

                  <h2>
                    Start the conversation
                  </h2>

                  <p>
                    Send a message and our
                    support team will assist you.
                  </p>

                </div>

              )}


            {/* ----------------------------------
                MESSAGES
            ---------------------------------- */}

            {messages.map((message) => {

              const isMine =
                message.sender?._id === user?._id;

              return (

                <div
                  key={message._id}
                  className={`support-message-row ${
                    isMine
                      ? 'support-message-mine'
                      : 'support-message-other'
                  }`}
                >

                  {!isMine && (

                    <div className="support-message-avatar">

                      <SupportAgent />

                    </div>

                  )}


                  <div
                    className={`support-message-bubble ${
                      isMine
                        ? 'mine'
                        : 'other'
                    }`}
                  >

                    {!isMine && (

                      <span className="support-message-sender">
                        {message.sender?.fullName ||
                          'Lavendro Support'}
                      </span>

                    )}

                    <p>
                      {message.message}
                    </p>

                    <span className="support-message-time">
                      {formatTime(
                        message.createdAt
                      )}
                    </span>

                  </div>

                </div>

              );
            })}


            <div ref={messagesEndRef}></div>

          </div>


          {/* ====================================
              MESSAGE INPUT
          ==================================== */}

          <form
            className="support-chat-input-area"
            onSubmit={handleSendMessage}
          >

            <textarea
              value={messageText}
              onChange={(e) =>
                setMessageText(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              disabled={sending}
            />


            <button
              type="submit"
              className="support-chat-send"
              disabled={
                !messageText.trim() ||
                sending
              }
            >

              {sending ? (
                <span className="send-loading">
                  ...
                </span>
              ) : (
                <Send />
              )}

            </button>

          </form>


          <div className="support-chat-input-footer">

            <span>
              Press Enter to send
            </span>

            <span>
              Your conversation is private
            </span>

          </div>

        </div>

      </main>

    </div>
  );
};

export default SupportChat;