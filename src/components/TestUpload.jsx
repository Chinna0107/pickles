import { useState } from 'react';
import API from '../config';

const TestUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState('');

  const testUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API}/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(`Success: ${data.url}`);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (err) {
      setResult(`Network Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>Upload Test</h3>
      <input 
        type="file" 
        accept="image/*"
        onChange={(e) => e.target.files[0] && testUpload(e.target.files[0])}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {result && <p>{result}</p>}
    </div>
  );
};

export default TestUpload;