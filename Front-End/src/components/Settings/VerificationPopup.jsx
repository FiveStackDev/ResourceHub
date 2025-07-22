import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Dialog } from '@mui/material';
import { Shield, Mail, Check, X } from 'lucide-react';
import { getAuthHeader } from '../../utils/authHeader';
import { decodeToken, useUser } from '../../contexts/UserContext';
import { BASE_URLS } from '../../services/api/config';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import './Styles/VerifyPopup.css';

function VerificationPopup({ onClose, email, code }) {
  // Local state to hold the user-entered verification code
  const [inputcode, setInputCode] = useState('');
  const { userData } = useUser();
  const { updateCSSVariables } = useThemeStyles();

  // Apply theme variables when component mounts
  React.useEffect(() => {
    updateCSSVariables();
  }, [updateCSSVariables]);

  // Handle form submission for email verification
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the entered code matches the generated code
    if (inputcode === code) {
      try {
        // Use consistent userId logic with fallback
        let userId = userData?.id;
        if (!userId) {
          const decoded = decodeToken();
          userId = decoded?.id;
        }
        if (!userId) throw new Error('User ID not found in token');

        // Send verified email update to the server with Authorization header
        await axios.put(
          `${BASE_URLS.settings}/email/${userId}`,
          { email },
          {
            headers: {
              ...getAuthHeader(),
            },
          },
        );

        toast.success('Verification successful!');
        onClose(); // Close the popup after successful verification
      } catch (error) {
        console.error('There was an error verifying the email!', error);
        toast.error('Verification failed. Please try again.');
      }
    } else {
      // Show error if code does not match
      toast.error('Invalid verification code. Please try again.');
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="verification-popup-title"
      aria-describedby="verification-popup-description"
      BackdropProps={{
        className: 'verify-popup-backdrop',
      }}
      PaperProps={{
        style: {
          borderRadius: '20px',
          overflow: 'visible',
        },
      }}
    >
      <div className="verify-inner">
        <div className="verify-header">
          <div className="verify-icon">
            <Shield className="shield-icon" />
          </div>
          <h1 className="verify-title">Email Verification</h1>
          <p className="verify-subtitle">
            Verify your email address to secure your account
          </p>
        </div>

        <form className="verify-form" onSubmit={handleSubmit}>
          <div className="verify-email-info">
            <Mail className="mail-icon" />
            <div className="email-text">
              <span className="verify-label">Verification code sent to:</span>
              <span className="email-address">{email}</span>
            </div>
          </div>

          {/* Input field for verification code */}
          <div className="verify-input-group">
            <label htmlFor="verifycode" className="verify-input-label">
              Enter Verification Code
            </label>
            <input
              type="text"
              name="verifycode"
              id="verifycode"
              placeholder="Enter 6-digit verification code"
              className="verify-input"
              value={inputcode}
              onChange={(e) => setInputCode(e.target.value)}
              maxLength={6}
              autoComplete="one-time-code"
              required
            />
          </div>

          {/* Submit and cancel buttons */}
          <div className="verify-buttons">
            <button type="submit" className="verify-submit-btn">
              <Check className="btn-icon" />
              Verify Email
            </button>
            <button
              type="button"
              className="verify-cancel-btn"
              onClick={onClose}
            >
              <X className="btn-icon" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default VerificationPopup;
