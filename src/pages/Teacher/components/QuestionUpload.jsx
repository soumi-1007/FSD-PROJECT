import React, { useState } from 'react';

const QuestionUpload = () => {
  const [formData, setFormData] = useState({ subject: '', topic: '', file: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.subject && formData.file) {
      alert(`Successfully uploaded notes for ${formData.subject}`);
      setFormData({ subject: '', topic: '', file: null });
    }
  };

  return (
    <div className="module-card">
      <h2>Question Paper & Notes Upload</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', marginTop: '1.5rem' }}>
        <div className="form-group">
          <label>Subject</label>
          <input 
            type="text" 
            value={formData.subject} 
            onChange={(e) => setFormData({...formData, subject: e.target.value})} 
            required 
            placeholder="e.g. Mathematics"
          />
        </div>
        <div className="form-group">
          <label>Topic / Description</label>
          <textarea 
            rows="3" 
            value={formData.topic} 
            onChange={(e) => setFormData({...formData, topic: e.target.value})} 
            required
            placeholder="Brief description of the material"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Upload File (PDF/Docs)</label>
          <input 
            type="file" 
            onChange={(e) => setFormData({...formData, file: e.target.files[0]})} 
            required 
            style={{ padding: '0.4rem' }}
          />
        </div>
        <button type="submit" className="btn-primary" style={{ width: 'auto' }}>Upload Resource</button>
      </form>
    </div>
  );
};

export default QuestionUpload;
