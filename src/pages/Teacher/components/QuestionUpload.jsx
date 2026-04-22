import React, { useState, useEffect } from 'react';
import { addNote, getNotes } from '../../../utils/storage';

const QuestionUpload = () => {
  const [formData, setFormData] = useState({ subject: '', topic: '', file: null });
  const [uploadedNotes, setUploadedNotes] = useState([]);

  useEffect(() => {
    setUploadedNotes(getNotes());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.subject && formData.topic && formData.file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Save metadata and file data to localStorage
        const updatedNotes = addNote({
          title: formData.topic,
          subject: formData.subject,
          url: reader.result // This contains the base64 data URL
        });
        
        setUploadedNotes(updatedNotes);
        alert(`Successfully uploaded notes for ${formData.subject}`);
        setFormData({ subject: '', topic: '', file: null });
      };
      reader.readAsDataURL(formData.file);
    } else {
      alert("Please fill all fields and select a file.");
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

      <div style={{ marginTop: '3rem' }}>
        <h3>Recently Uploaded Resources</h3>
        <div className="data-list" style={{ marginTop: '1rem' }}>
          {[...uploadedNotes].reverse().map(note => (
            <div key={note.id} className="data-item">
              <div>
                <strong style={{ color: 'var(--primary)' }}>{note.subject}</strong>: {note.title}
              </div>
              <span className="status-badge badge-success">Live</span>
            </div>
          ))}
          {uploadedNotes.length === 0 && <p style={{ color: 'var(--border)', fontStyle: 'italic' }}>No resources uploaded yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default QuestionUpload;
