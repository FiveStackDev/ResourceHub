
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/ProfileSection.css';
import { BASE_URLS } from '../../services/api/config';
import { getAuthHeader } from '../../utils/authHeader';
import ConfirmationDialog from './ConfirmationDialog';
import { toast } from 'react-toastify';
import { useUser } from '../../contexts/UserContext';
import { decodeToken } from '../../contexts/UserContext';
import VerificationPopup from './OrgVerificationPopup';

const OrganizationSection = () => {
  // State to store form data
  const [formData, setFormData] = useState({ org_name: '', org_logo: '', org_address: '',org_email:'' });
  const [openVerifyPopup, setOpenVerifyPopup] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [code, setCode] = useState('');
  // Loading and error states for async data fetching
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for confirmation dialog visibility and actions
  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    message: '',
    onConfirm: null,
  });


  // Get user id from context
  const { userData } = useUser();
  // Fallback: decode token directly if userData.id is undefined
  let userId = userData.id;
  if (!userId) {
    const decoded = decodeToken();
    userId = decoded?.id;
    console.log('ProfileSettings fallback decoded userId:', userId);
  } else {
    console.log('ProfileSettings userId:', userId);
  }

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          setError('User ID not found. Please log in again.');
          setLoading(false);
          return;
        }
        const { data } = await axios.get(
          `${BASE_URLS.orgsettings}/details/1`,
          {
            headers: {
              ...getAuthHeader(),
            },
          }
        );
        const [organization] = data;
        setFormData({
         org_name: organization.org_name || '',
         org_logo: organization.org_logo || '',
         org_address: organization.org_address || '',
          org_email: organization.org_email || '',
        });
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    let key = name;
    if (name === 'name') key = 'org_name';
    if (name === 'picture') key = 'org_logo';
    if (name === 'bio') key = 'org_address';
    if (name === 'email') key = 'org_email';
    setFormData({ ...formData, [key]: value });
  };

  // Handle form submission with confirmation dialog
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!formData.org_name.trim()) return toast.error('Name is required');
    if (formData.org_address.length > 150)
      return toast.error('Bio cannot exceed 150 characters');

    // Trigger confirmation dialog
    setConfirmationDialog({
      open: true,
      message: 'Are you sure you want to update your profile?',
      onConfirm: async () => {
        try {
          // Use fallback userId (from context or decoded token)
          if (!userId) throw new Error('User ID not found');
          // Send profile update request
          await axios.put(
            `${BASE_URLS.orgsettings}/profile/1`,
            {
              org_name: formData.org_name,
              org_logo: formData.org_logo,
              org_address: formData.org_address,
            },
            {
              headers: {
                ...getAuthHeader(),
              },
            }
          );
          toast.success('Organization Profile updated successfully!');
          // Close dialog after successful update
          setConfirmationDialog({ open: false, message: '', onConfirm: null });
        } catch (err) {
          toast.error(`Error: ${err.response?.data?.message || err.message}`);
        }
      },
    });
  };

  // Show loading or error messages before rendering form
  if (loading) return <p className="loading">Loading...</p>;
  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <a href="/login">
          <button style={{marginTop: '1rem'}}>Go to Login</button>
        </a>
      </div>
    );
  }

   // Handle email update and trigger verification popup
  const handleEmailSubmit = async (email) => {
    try {
      // Use the same userId logic as other functions
      let currentUserId = userData.id;
      if (!currentUserId) {
        const decoded = decodeToken();
        currentUserId = decoded?.id;
      }
      if (!currentUserId) throw new Error('User ID not found');
      const { data } = await axios.get(
        `${BASE_URLS.orgsettings}/details/1`,
        {
          headers: {
            ...getAuthHeader(),
          },
        }
      );
      const existingEmail = data[0]?.org_email;
      if (email === existingEmail) {
        toast.error('This email is already in use.');
        return;
      }
      setSelectedEmail(email);
      setOpenVerifyPopup(true);
      const randomCode =
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      setCode(randomCode.toString());
      await axios.post(
        `${BASE_URLS.orgsettings}/sendEmail/`,
        {
          email,
          code: randomCode,
        },
        {
          headers: {
            ...getAuthHeader(),
          },
        }
      );
      toast.success(`Verification code sent to ${email} successfully!`);
    } catch (error) {
      toast.error(
        `Failed to send verification code: ${error.response?.data?.message || error.message}`,
      );
    }
  };

  return (
    <div className="profile-section">
      <div className="header">
        <h2>Organization</h2>
        {formData.org_logo && (
          <img
            src={formData.org_logo}
            alt="Organization Logo"
            onError={(e) => { e.target.style.display = 'none'; toast.error('Invalid image URL'); }}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Organization Name</label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.org_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Organization Logo URL</label>
          <input
            className="form-input"
            type="url"
            name="picture"
            value={formData.org_logo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="bio"
            value={formData.org_address}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
      <br></br>
         <hr></hr>
         <br></br>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.org_email}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => handleEmailSubmit(formData.org_email)}
          >
            Update Email
          </button>
        </div>


        {openVerifyPopup && (
        <VerificationPopup
          onClose={() => setOpenVerifyPopup(false)}
          email={selectedEmail}
          code={code}
        />
      )}

      {confirmationDialog.open && (
        <ConfirmationDialog
          message={confirmationDialog.message}
          onConfirm={confirmationDialog.onConfirm}
          onCancel={() =>
            setConfirmationDialog({ open: false, message: '', onConfirm: null })
          }
        />
      )}
    </div>
  );
};

export default OrganizationSection;
