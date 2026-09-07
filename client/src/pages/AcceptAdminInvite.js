import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/AcceptAdminInvite.css';
const AcceptAdminInvite = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error when user starts correcting the field
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must contain at least 8 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {
    const response = await axios.post(
      'http://localhost:5000/api/admin/invitations/accept',
      {
        token,
        fullName: formData.fullName,
        password: formData.password
      }
    );

    console.log('Admin invitation accepted:', response.data);

    navigate('/login');

  } catch (error) {
  console.error('Accept invitation error:', error);

  console.log(
    'Backend response:',
    error.response?.data
  );

  const message =
    error.response?.data?.message ||
    'Something went wrong. Please try again.';

  setErrors({
    submit: message
  });
}
};

  return (
    <main className="admin-invite-page">

      {/* Decorative background elements */}
      <div className="invite-bg-shape invite-bg-shape-one"></div>
      <div className="invite-bg-shape invite-bg-shape-two"></div>
      <div className="invite-bg-shape invite-bg-shape-three"></div>

      <section className="admin-invite-card">

        {/* Brand */}
        <div className="admin-invite-brand">
          <div className="admin-invite-brand-mark">
            L
          </div>

          <div className="admin-invite-brand-name">
            Lavendro
          </div>
        </div>

        {/* Invitation Icon */}
        <div className="admin-invite-icon">
          <span>✦</span>
        </div>

        {/* Heading */}
        <div className="admin-invite-heading">
          <p className="admin-invite-eyebrow">
            ADMINISTRATOR INVITATION
          </p>

          <h1>You're Invited</h1>

          <div className="admin-invite-divider">
            <span></span>
            <i>✦</i>
            <span></span>
          </div>

          <p className="admin-invite-message">
            You've been invited to join{' '}
            <strong>Lavendro</strong>{' '}
            as an Administrator.
          </p>

          <p className="admin-invite-description">
            Create your administrator account below to access
            the Lavendro event planning dashboard.
          </p>
        </div>

        {/* Form */}
        <form
          className="admin-invite-form"
          onSubmit={handleSubmit}
          noValidate
        >

          {/* Full Name */}
          <div className="invite-form-group">

            <label htmlFor="fullName">
              Full Name
            </label>

            <div
              className={`invite-input-wrapper ${
                errors.fullName ? 'has-error' : ''
              }`}
            >
              <span className="invite-input-icon">
                ◯
              </span>

              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>

            {errors.fullName && (
              <p className="invite-error">
                {errors.fullName}
              </p>
            )}
          </div>


          {/* Password */}
          <div className="invite-form-group">

            <label htmlFor="password">
              Password
            </label>

            <div
              className={`invite-input-wrapper ${
                errors.password ? 'has-error' : ''
              }`}
            >
              <span className="invite-input-icon">
                🔒
              </span>

              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a secure password"
                autoComplete="new-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {errors.password && (
              <p className="invite-error">
                {errors.password}
              </p>
            )}

          </div>


          {/* Confirm Password */}
          <div className="invite-form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div
              className={`invite-input-wrapper ${
                errors.confirmPassword ? 'has-error' : ''
              }`}
            >
              <span className="invite-input-icon">
                🔒
              </span>

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                aria-label={
                  showConfirmPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="invite-error">
                {errors.confirmPassword}
              </p>
            )}

          </div>


          {/* Submit */}
          <button
            type="submit"
            className="admin-invite-submit"
          >
            <span>Accept Invitation</span>
            <span className="submit-arrow">→</span>
          </button>

        </form>


        {/* Validity */}
        <div className="invite-validity">

          <div className="validity-icon">
            ⏱
          </div>

          <div>
            <strong>Invitation valid for 24 hours</strong>

            <p>
              For your security, this invitation link
              will expire after 24 hours.
            </p>
          </div>

        </div>


        {/* Back */}
        <button
          type="button"
          className="invite-back-button"
          onClick={() => navigate('/')}
        >
          ← Back to Lavendro
        </button>


        {/* Footer */}
        <p className="admin-invite-footer">
          Creating unforgettable moments, one event at a time.
        </p>

      </section>

    </main>
  );
};

export default AcceptAdminInvite;