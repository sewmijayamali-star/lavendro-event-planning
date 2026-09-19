import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EventPlannerForm from "../../components/EventPlannerForm";

const AcceptEventPlannerInvite = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [invitationEmail, setInvitationEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyInvitation = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/event-planner/invitations/${token}`
        );

        setInvitationEmail(response.data.email);

      } catch (error) {
        console.error(
          "Invitation verification error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "This invitation is invalid or has expired."
        );
      } finally {
        setLoading(false);
      }
    };

    if (!token) {
      setError("Invalid invitation link.");
      setLoading(false);
      return;
    }

    verifyInvitation();
  }, [token]);

  const handleSuccess = () => {
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="event-planner-invitation-loading">
        <h2>Verifying Invitation...</h2>
        <p>Please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="event-planner-invitation-error">
        <h2>Invitation Unavailable</h2>
        <p>{error}</p>

        <button onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <EventPlannerForm
      mode="invitation"
      invitationToken={token}
      invitationEmail={invitationEmail}
      onSuccess={handleSuccess}
    />
  );
};

export default AcceptEventPlannerInvite;