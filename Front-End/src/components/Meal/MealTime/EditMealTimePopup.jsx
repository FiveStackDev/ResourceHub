import { useState, useEffect } from 'react';
import * as React from 'react';
import { Dialog, Input, Button, Typography } from '@mui/material';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import '../Meal-CSS/AddMealPopup.css';
import { BASE_URLS } from '../../../services/api/config';
import { getAuthHeader } from '../../../utils/authHeader';
import { useThemeStyles } from '../../../hooks/useThemeStyles';

function EditPopup({
  open,
  onClose,
  onSave,
  mealName,
  mealImage,
  setMealName,
  setMealImage,
  mealId,
}) {
  // State to hold selected file object
  const [imageFile, setImageFile] = useState(null);
  // State to track upload progress
  const [uploading, setUploading] = useState(false);
  // State for image preview URL
  const [previewUrl, setPreviewUrl] = useState(mealImage || '');
  
  // Theme styles hook
  const { updateCSSVariables } = useThemeStyles();
  
  // Update CSS variables when theme changes
  useEffect(() => {
    updateCSSVariables();
  }, [updateCSSVariables]);

  // Handle selection of file input and create preview URL
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const fileURL = URL.createObjectURL(file); // Preview image
      setPreviewUrl(fileURL);
    }
  };

  // Upload selected image to Cloudinary and return URL
  const uploadImageToCloudinary = async () => {
    if (!imageFile) {
      return null; // No new image selected, keep existing
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(
        import.meta.env.VITE_CLOUDINARY_API_URL,
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();
      setUploading(false);
      return data.secure_url; // Return uploaded image URL
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
      toast.error('Image upload failed. Please try again.');
      return null;
    }
  };

  // Handle save with optional image upload
  const handleSave = async () => {
    if (!mealName.trim()) {
      toast.error('Please provide a meal time name.');
      return;
    }

    let finalImageUrl = mealImage; // Use existing image by default

    // If a new image was selected, upload it
    if (imageFile) {
      const uploadedUrl = await uploadImageToCloudinary();
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
        setMealImage(finalImageUrl); // Update the image state
      } else {
        return; // Stop if upload failed
      }
    }

    onSave(mealId, mealName, finalImageUrl);
  };

  // Update preview when mealImage prop changes
  React.useEffect(() => {
    setPreviewUrl(mealImage || '');
  }, [mealImage]);
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      BackdropProps={{
        style: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }
      }}
    >
      <div className="mealtime-popup-container">
        <div className="mealtime-popup-header">
          <div>
            <h2 className="mealtime-title">Edit Meal Time</h2>
            <p className="mealtime-subtitle">Update meal time information</p>
          </div>
          {/* Close button for the popup */}
          <button onClick={onClose} className="mealtime-close-btn">
            <X size={20} />
          </button>
        </div>

          {/* Show image preview if available */}
          {previewUrl && (
            <div className="mealtime-image-preview">
              <Typography variant="h6">Preview:</Typography>
              <img
                src={previewUrl}
                alt="Meal Time Preview"
                className="mealtime-preview-img"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}

        <div className="mealtime-form">
          <div className="mealtime-input-group">
            <label className="mealtime-label">Meal Time Image</label>
            {/* File input for image upload */}
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              fullWidth
            />
          </div>

          <div className="mealtime-input-group">
            <label className="mealtime-label">Meal Time Name</label>
            <Input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              fullWidth
              className="mealtime-input"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="mealtime-buttons">
          <button onClick={onClose} className="mealtime-cancel-btn">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="mealtime-submit-btn"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Save'}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default EditPopup;
