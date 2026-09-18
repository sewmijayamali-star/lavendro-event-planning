import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import socket from "../socket";

import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CircleIcon from "@mui/icons-material/Circle";

import "../styles/SupportChat.css";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const SupportChat = () => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  const messagesEndRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // ==========================================
  // AUTO SCROLL
  // ==========================================

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ==========================================
  // START SUPPORT CHAT
  // ==========================================

  useEffect(() => {
    const startChat = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
          setError(
            "Please login to access the support chat."
          );

          setLoading(false);
          return;
        }

        // ------------------------------------------
        // CONNECT SOCKET
        // ------------------------------------------

        socket.connect();

        socket.on("connect", () => {
          console.log(
            "Socket connected:",
            socket.id
          );

          setConnected(true);
        });

        socket.on("disconnect", () => {
          console.log(
            "Socket disconnected"
          );

          setConnected(false);
        });

        // ------------------------------------------
        // CREATE / GET CONVERSATION
        // ------------------------------------------

        const response = await axios.post(
          `${API_URL}/api/support/conversations`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const conversationData =
          response.data.conversation;

        setConversation(conversationData);

        // ------------------------------------------
        // JOIN SOCKET ROOM
        // ------------------------------------------

        socket.emit(
          "join_conversation",
          conversationData._id
        );

        console.log(
          "Joined conversation:",
          conversationData._id
        );

        // ------------------------------------------
        // LOAD OLD MESSAGES
        // ------------------------------------------

        const messagesResponse =
          await axios.get(
            `${API_URL}/api/support/conversations/${conversationData._id}/messages`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setMessages(
          messagesResponse.data.messages || []
        );

        setLoading(false);

      } catch (error) {
        console.error(
          "Support chat error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to start support chat."
        );

        setLoading(false);
      }
    };

    startChat();

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");

      socket.disconnect();
    };
  }, []);

  // ==========================================
  // RECEIVE REAL-TIME MESSAGE
  // ==========================================

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log(
        "New real-time message:",
        data
      );

      if (
        conversation &&
        data.conversationId === conversation._id
      ) {
        setMessages((previousMessages) => {

          // Prevent duplicate messages
          const alreadyExists =
            previousMessages.some(
              (msg) =>
                msg._id === data.message._id
            );

          if (alreadyExists) {
            return previousMessages;
          }

          return [
            ...previousMessages,
            data.message,
          ];
        });
      }
    };

    socket.on(
      "receive_message",
      handleReceiveMessage
    );

    return () => {
      socket.off(
        "receive_message",
        handleReceiveMessage
      );
    };
  }, [conversation]);

  // ==========================================
  // SEND MESSAGE
  // ==========================================

 // ==========================================
// SEND MESSAGE
// ==========================================

const handleSendMessage = async () => {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    return;
  }

  if (!conversation) {
    return;
  }

  try {
    setSending(true);
    setError("");

    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/api/support/conversations/${conversation._id}/messages`,
      {
        message: trimmedMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const newMessage = response.data.data;

    console.log(
      "Message sent successfully:",
      newMessage
    );

    setMessages((previousMessages) => {
      const exists = previousMessages.some(
        (msg) => msg._id === newMessage._id
      );

      if (exists) {
        return previousMessages;
      }

      return [
        ...previousMessages,
        newMessage,
      ];
    });

    setMessage("");

  } catch (error) {
    console.error(
      "Send message error:",
      error
    );

    setError(
      error.response?.data?.message ||
        "Failed to send message."
    );

  } finally {
    setSending(false);
  }
};


// ==========================================
// ENTER KEY TO SEND
// ==========================================

const handleKeyDown = (event) => {
  if (
    event.key === "Enter" &&
    !event.shiftKey
  ) {
    event.preventDefault();

    handleSendMessage();
  }
};

  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(
      date
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ==========================================
  // CHECK MESSAGE OWNER
  // ==========================================

  const isMyMessage = (msg) => {
    if (!user) return false;

    const senderId =
      typeof msg.sender === "object"
        ? msg.sender._id
        : msg.sender;

    return (
      senderId === user._id ||
      senderId === user.id
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="support-page">
        <div className="support-loading">

          <div className="loading-spinner"></div>

          <h3>
            Connecting to Lavendro Support...
          </h3>

          <p>
            Please wait a moment.
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error && !conversation) {
    return (
      <div className="support-page">

        <div className="support-error">

          <SupportAgentIcon
            className="error-icon"
          />

          <h2>
            Unable to Connect
          </h2>

          <p>
            {error}
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // MAIN CHAT
  // ==========================================

  return (
    <div className="support-page">

      <div className="support-chat-container">

        {/* ============================= */}
        {/* CHAT HEADER */}
        {/* ============================= */}

        <div className="support-chat-header">

          <div className="support-header-left">

            <button
              className="back-button"
              onClick={() =>
                window.history.back()
              }
            >
              <ArrowBackIcon />
            </button>

            <div className="support-avatar">

              <SupportAgentIcon />

            </div>

            <div>

              <h2>
                Lavendro Support
              </h2>

              <div className="connection-status">

                <CircleIcon
                  className={
                    connected
                      ? "status-online"
                      : "status-offline"
                  }
                />

                <span>
                  {connected
                    ? "Connected"
                    : "Connecting..."}
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ============================= */}
        {/* MESSAGES */}
        {/* ============================= */}

        <div className="messages-container">

          {/* Welcome message */}

          {messages.length === 0 && (

            <div className="chat-welcome">

              <div className="welcome-icon">

                <SupportAgentIcon />

              </div>

              <h2>
                Welcome to Lavendro Support 👋
              </h2>

              <p>
                Have a question about our
                services, packages, bookings,
                or events?
              </p>

              <p>
                Send us a message and our team
                will be happy to assist you.
              </p>

            </div>

          )}


          {/* Messages */}

          {messages.map((msg) => {

            const mine =
              isMyMessage(msg);

            return (

              <div
                key={msg._id}
                className={`message-row ${
                  mine
                    ? "my-message-row"
                    : "support-message-row"
                }`}
              >

                <div
                  className={`message-bubble ${
                    mine
                      ? "my-message"
                      : "support-message"
                  }`}
                >

                  {!mine && (

                    <div className="sender-name">

                      {msg.sender?.fullName ||
                        "Lavendro Support"}

                    </div>

                  )}

                  <div className="message-text">

                    {msg.message}

                  </div>

                  <div className="message-time">

                    {formatTime(
                      msg.createdAt
                    )}

                  </div>

                </div>

              </div>

            );
          })}


          <div ref={messagesEndRef} />

        </div>


        {/* ============================= */}
        {/* ERROR MESSAGE */}
        {/* ============================= */}

        {error && conversation && (

          <div className="chat-error">

            {error}

          </div>

        )}


        {/* ============================= */}
        {/* MESSAGE INPUT */}
        {/* ============================= */}

        <div className="message-input-container">

          <textarea
            value={message}

            onChange={(event) =>
              setMessage(
                event.target.value
              )
            }

            onKeyDown={handleKeyDown}

            placeholder="Type your message..."

            rows="1"

            disabled={sending}

            className="message-input"
          />


          <button
            onClick={
              handleSendMessage
            }

            disabled={
              sending ||
              !message.trim()
            }

            className="send-button"
          >

            <SendIcon />

          </button>

        </div>

        <div className="chat-footer">

          Your conversation is private and
          securely handled by Lavendro.

        </div>

      </div>

    </div>
  );
};

export default SupportChat;