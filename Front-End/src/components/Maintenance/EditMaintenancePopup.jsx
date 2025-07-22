import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { X, Edit, Settings } from 'lucide-react';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import './MaintenanceDialog.css';

export const EditMaintenance = ({ maintenance, open, onClose, onSave }) => {
  const [description, setDescription] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [status, setStatus] = useState('');

  // Theme styles hook
  const { updateCSSVariables } = useThemeStyles();

  // Update CSS variables when theme changes
  useEffect(() => {
    updateCSSVariables();
  }, [updateCSSVariables]);

  useEffect(() => {
    if (maintenance) {
      setDescription(maintenance.description || '');
      setPriorityLevel(maintenance.priorityLevel || '');
      setStatus(maintenance.status || '');
    }
  }, [maintenance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      return;
    }
    onSave({ ...maintenance, description, priorityLevel, status });
    onClose();
  };

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'low':
        return 'priority-low';
      case 'medium':
        return 'priority-medium';
      case 'high':
        return 'priority-high';
      default:
        return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'in progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      BackdropProps={{
        style: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }}
      PaperProps={{
        style: {
          borderRadius: '16px',
          overflow: 'visible',
        },
      }}
    >
      <div className="maintenance-popup-container">
        <div className="maintenance-popup-header">
          <div className="maintenance-popup-header-content">
            <div className="maintenance-popup-header-icon">
              <Settings size={24} color="#f59e0b" />
            </div>
            <div>
              <h2 className="maintenance-popup-title">Edit Maintenance</h2>
              <p className="maintenance-popup-subtitle">
                Update maintenance request details
              </p>
            </div>
          </div>
          <button onClick={onClose} className="maintenance-popup-close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="maintenance-popup-content">
            <div className="maintenance-popup-form">
              <div className="maintenance-popup-input-group">
                <TextField
                  fullWidth
                  label="Name"
                  value={maintenance?.name || ''}
                  disabled
                  className="maintenance-popup-textfield"
                />
              </div>

              <div className="maintenance-popup-input-group">
                <TextField
                  fullWidth
                  label="Request Date"
                  value={maintenance?.submitted_date || ''}
                  disabled
                  className="maintenance-popup-textfield"
                />
              </div>

              <div className="maintenance-popup-input-group">
                <FormControl fullWidth className="maintenance-popup-select">
                  <InputLabel>Priority Level</InputLabel>
                  <Select
                    value={priorityLevel}
                    label="Priority Level"
                    onChange={(e) => setPriorityLevel(e.target.value)}
                  >
                    <MenuItem value="Low">🟡 Low </MenuItem>
                    <MenuItem value="Medium">🟠 Medium </MenuItem>
                    <MenuItem value="High">🔴 High </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="maintenance-popup-input-group">
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="maintenance-popup-textfield"
                />
              </div>

              <div className="maintenance-popup-input-group">
                <FormControl fullWidth className="maintenance-popup-select">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          <div className="maintenance-popup-actions">
            <button
              type="button"
              onClick={onClose}
              className="maintenance-popup-cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="maintenance-popup-submit-btn">
              <Edit size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
