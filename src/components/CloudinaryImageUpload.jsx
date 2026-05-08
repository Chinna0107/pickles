import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage, FiLoader, FiCheck } from 'react-icons/fi';
import API from '../config';

const CloudinaryImageUpload = ({ onImageUploaded, currentImage, onRemove, index }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const uploadToBackend = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API}/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const data = await response.json();
    return data.url;
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError('');
    setUploading(true);
    setSuccess(false);

    try {
      const imageUrl = await uploadToBackend(file);
      onImageUploaded(imageUrl);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } };
      handleFileSelect(fakeEvent);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  return (
    <div className={`cloudinary-upload-container ${success ? 'upload-success' : ''}`}>
      <div className="image-upload-row">
        {currentImage ? (
          <div className="image-preview-container">
            <img 
              src={currentImage} 
              alt="Product" 
              className="image-preview"
              onError={(e) => {
                e.target.style.display = 'none';
                setError('Failed to load image');
              }}
            />
            <button
              type="button"
              className="remove-image-btn"
              onClick={() => onRemove(index)}
              title="Remove image"
            >
              <FiX size={14} />
            </button>
          </div>
        ) : (
          <div
            className={`upload-dropzone ${dragOver ? 'drag-over' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <div className="upload-loading">
                <FiLoader className="spinning" size={28} />
                <span>Uploading image...</span>
                <small>Please wait</small>
              </div>
            ) : success ? (
              <div className="upload-loading" style={{ color: '#10b981' }}>
                <FiCheck size={28} />
                <span>Upload successful!</span>
              </div>
            ) : (
              <div className="upload-placeholder">
                <FiImage size={36} />
                <span>Drop your image here</span>
                <small>or click to browse • PNG, JPG, WEBP up to 5MB</small>
              </div>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        <div className="upload-actions">
          <button
            type="button"
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <FiLoader className="spinning" size={14} />
            ) : (
              <FiUpload size={14} />
            )}
            {uploading ? 'Uploading...' : currentImage ? 'Replace Image' : 'Choose Image'}
          </button>
          
          {currentImage && (
            <button
              type="button"
              className="remove-btn"
              onClick={() => onRemove(index)}
            >
              <FiX size={14} />
              Remove
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="upload-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default CloudinaryImageUpload;