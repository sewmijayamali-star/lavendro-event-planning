import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

import {
  ArrowBack,
  Send,
  SupportAgent,
  Person,
  CheckCircle,
} from "@mui/icons-material";

import "../../styles/support/SupportDashboardChat.css";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const SupportDashboardChat = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  const token = localStorage.getItem("token");

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // ==========================================
  // LOAD CONVERSATION
  // ==========================================

  useEffect(() => {
    const loadConversation = async () => {
      try {
        setLoading(true);
        setError("");

        if (!token) {
          navigate("/login");
          return;
        }

        // Load conversation messages
        const response = await axios.get(
          `${API_URL}/api/support/conversations/${id}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(response.data.messages || []);

        /*
         * We already know the conversation ID.
         *
         * Get all support conversations and find
         * the selected conversation.
         */

        const conversationsResponse = await axios.get(
          `${API_URL}/api/support/conversations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const selectedConversation =
          conversationsResponse.data.conversations.find(
            (conversationItem) =>
              conversationItem._id === id
          );

        if (selectedConversation) {
          setConversation(selectedConversation);
        } else {
          setError("Conversation not found.");
        }

      } catch (error) {
        console.error(
          "Load support conversation error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load this conversation."
        );
      } finally {
        setLoading(false);
      }
    };

    loadConversation();
  }, [id, navigate, token]);


  // ==========================================
  // SOCKET.IO
  // ==========================================

  useEffect(() => {
    if (!id) return;

    const socket = io(API_URL, {
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    // ------------------------------------------
    // CONNECT
    // ------------------------------------------

    socket.on("connect", () => {
      console.log(
        "Support dashboard socket connected:",
        socket.id
      );

      setConnected(true);

      socket.emit(
        "join_conversation",
        id
      );

      console.log(
        "Joined support conversation:",
        id
      );
    });


    // ------------------------------------------
    // RECEIVE MESSAGE
    // ------------------------------------------

    socket.on(
      "receive_message",
      (newMessage) => {

        console.log(
          "Support dashboard received:",
          newMessage
        );

        /*
         * Backend currently emits the complete
         * SupportMessage document.
         */

        if (
          newMessage.conversation?.toString() !==
            id &&
          newMessage.conversation?._id !== id
        ) {
          return;
        }

        setMessages((previousMessages) => {

          const alreadyExists =
            previousMessages.some(
              (messageItem) =>
                messageItem._id ===
                newMessage._id
            );

          if (alreadyExists) {
            return previousMessages;
          }

          return [
            ...previousMessages,
            newMessage,
          ];
        });
      }
    );


    // ------------------------------------------
    // DISCONNECT
    // ------------------------------------------

    socket.on("disconnect", () => {
      console.log(
        "Support dashboard socket disconnected"
      );

      setConnected(false);
    });


    // ------------------------------------------
    // CLEANUP
    // ------------------------------------------

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };

  }, [id]);


  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);


  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const handleSendMessage = async () => {

    const trimmedMessage =
      message.trim();

    if (!trimmedMessage || sending) {
      return;
    }

    try {

      setSending(true);
      setError("");

      const response = await axios.post(
        `${API_URL}/api/support/conversations/${id}/messages`,
        {
          message: trimmedMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const sentMessage =
        response.data.data;

      /*
       * Backend broadcasts this through Socket.IO.
       *
       * We add it here only if it hasn't already
       * arrived through Socket.IO.
       */

      setMessages((previousMessages) => {

        const exists =
          previousMessages.some(
            (messageItem) =>
              messageItem._id ===
              sentMessage._id
          );

        if (exists) {
          return previousMessages;
        }

        return [
          ...previousMessages,
          sentMessage,
        ];
      });

      setMessage("");

    } catch (error) {

      console.error(
        "Send support message error:",
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
  // ENTER KEY
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
  // MESSAGE OWNER
  // ==========================================

  const isMyMessage = (messageItem) => {

    if (!currentUser) {
      return false;
    }

    const senderId =
      typeof messageItem.sender === "object"
        ? messageItem.sender?._id
        : messageItem.sender;

    return (
      senderId === currentUser._id ||
      senderId === currentUser.id
    );
  };


  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (date) => {

    if (!date) {
      return "";
    }

    return new Date(date).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="support-dashboard-chat-loading">

        <div className="support-dashboard-spinner"></div>

        <h3>
          Loading conversation...
        </h3>

        <p>
          Please wait a moment.
        </p>

      </div>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error && !conversation) {

    return (
      <div className="support-dashboard-chat-error">

        <SupportAgent />

        <h2>
          Unable to Open Conversation
        </h2>

        <p>
          {error}
        </p>

        <button
          onClick={() =>
            navigate("/support/dashboard")
          }
        >
          <ArrowBack />
          Back to Conversations
        </button>

      </div>
    );
  }


  // ==========================================
  // MAIN
  // ==========================================

  return (

    <div className="support-dashboard-chat-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="support-dashboard-chat-topbar">

        <button
          className="support-dashboard-back"
          onClick={() =>
            navigate("/support/dashboard")
          }
        >
          <ArrowBack />

          <span>
            Back to Conversations
          </span>
        </button>


        <div className="support-dashboard-brand">
          <div className="support-dashboard-brand-icon">
            L
          </div>

          <div>
            <strong>
              Lavendro
            </strong>

            <span>
              Support Center
            </span>
          </div>
        </div>


        <div className="support-dashboard-connection">

          <span
            className={
              connected
                ? "connection-dot online"
                : "connection-dot offline"
            }
          />

          {connected
            ? "Connected"
            : "Connecting..."}

        </div>

      </header>


      {/* ======================================
          CHAT AREA
      ====================================== */}

      <main className="support-dashboard-chat-main">

        <div className="support-dashboard-chat-card">


          {/* ==================================
              CUSTOMER HEADER
          ================================== */}

          <div className="support-customer-header">

            <div className="support-customer-avatar">

              {conversation?.customer?.fullName
                ?.charAt(0)
                ?.toUpperCase() || "C"}

            </div>


            <div className="support-customer-info">

              <h1>
                {conversation?.customer?.fullName ||
                  "Customer"}
              </h1>

              <p>
                {conversation?.customer?.email ||
                  "No email available"}
              </p>

            </div>


            <div className="support-conversation-status">

              {conversation?.assignedSupport ? (
                <span className="assigned-badge">
                  Assigned
                </span>
              ) : (
                <span className="unassigned-badge">
                  Unassigned
                </span>
              )}

              <span className="open-badge">
                Open
              </span>

            </div>

          </div>


          {/* ==================================
              ASSIGNED SUPPORT
          ================================== */}

          {conversation?.assignedSupport && (

            <div className="assigned-information">

              <SupportAgent />

              <span>
                Assigned to{" "}
                <strong>
                  {conversation.assignedSupport.fullName}
                </strong>
              </span>

            </div>

          )}


          {/* ==================================
              ERROR
          ================================== */}

          {error && (

            <div className="support-dashboard-chat-error-bar">
              {error}
            </div>

          )}


          {/* ==================================
              MESSAGES
          ================================== */}

          <div className="support-dashboard-messages">

            {messages.length === 0 ? (

              <div className="support-dashboard-empty">

                <div className="support-dashboard-empty-icon">
                  <Person />
                </div>

                <h2>
                  No messages yet
                </h2>

                <p>
                  This customer has not sent
                  any messages in this conversation.
                </p>

              </div>

            ) : (

              messages.map((messageItem) => {

                const mine =
                  isMyMessage(messageItem);

                return (

                  <div
                    key={messageItem._id}
                    className={`support-dashboard-message-row ${
                      mine
                        ? "message-mine"
                        : "message-customer"
                    }`}
                  >

                    {!mine && (

                      <div className="customer-message-avatar">
                        {conversation?.customer?.fullName
                          ?.charAt(0)
                          ?.toUpperCase() || "C"}
                      </div>

                    )}


                    <div
                      className={`support-dashboard-message-bubble ${
                        mine
                          ? "mine"
                          : "customer"
                      }`}
                    >

                      {!mine && (
                        <span className="customer-message-name">
                          {conversation?.customer?.fullName ||
                            "Customer"}
                        </span>
                      )}

                      {mine && (
                        <span className="support-message-name">
                          You
                        </span>
                      )}

                      <p>
                        {messageItem.message}
                      </p>

                      <small>
                        {formatTime(
                          messageItem.createdAt
                        )}
                      </small>

                    </div>

                  </div>

                );
              })

            )}

            <div ref={messagesEndRef} />

          </div>


          {/* ==================================
              MESSAGE INPUT
          ================================== */}

          <div className="support-dashboard-message-input">

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Type your reply to the customer..."
              disabled={sending}
              rows={1}
            />


            <button
              onClick={handleSendMessage}
              disabled={
                sending ||
                !message.trim()
              }
            >

              {sending ? (
                "..."
              ) : (
                <Send />
              )}

            </button>

          </div>


          <div className="support-dashboard-chat-footer">

            <span>
              Press Enter to send
            </span>

            <span>
              <CheckCircle />
              Conversation is private
            </span>

          </div>

        </div>

      </main>

    </div>
  );
};

export default SupportDashboardChat;