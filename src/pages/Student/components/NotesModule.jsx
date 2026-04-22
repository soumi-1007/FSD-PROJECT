import React, { useState, useEffect } from 'react';
import { getNotes } from '../../../utils/storage';

const NotesModule = () => {
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    // Load notes from localStorage on component mount
    const loadedNotes = getNotes();
    setNotesList(loadedNotes);
  }, []);

  // Group notes by subject for structured display
  const notesBySubject = notesList.reduce((acc, note) => {
    if (!acc[note.subject]) acc[note.subject] = [];
    acc[note.subject].push(note);
    return acc;
  }, {});

  const handleOpenMaterial = (url, title) => {
    try {
      // Convert Data URL to Blob for better browser compatibility when opening in new tabs
      const parts = url.split(',');
      const byteString = atob(parts[1]);
      const mimeString = parts[0].split(':')[1].split(';')[0];
      
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      const blob = new Blob([ab], { type: mimeString });
      const blobUrl = URL.createObjectURL(blob);
      
      // Open in new tab
      window.open(blobUrl, '_blank');
      
      // Cleanup (optional, but good practice. Note: opening in new tab might need the URL to stay valid)
      // setTimeout(() => URL.revokeObjectURL(blobUrl), 10000); 
    } catch (error) {
      console.error("Error opening material:", error);
      // Fallback: try opening directly
      window.open(url, '_blank');
    }
  };

  return (
    <div className="module-card">
      <h2>Study Notes & Materials</h2>
      <div style={{ marginTop: '1.5rem' }}>
        {notesList.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
            <p style={{ fontSize: '1.2rem' }}>No study materials available yet.</p>
            <p style={{ fontSize: '0.9rem' }}>Materials uploaded by teachers will appear here.</p>
          </div>
        )}
        {Object.entries(notesBySubject).map(([subject, notes]) => (
          <div key={subject} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', color: 'var(--primary)' }}>{subject}</h3>
            <ul className="data-list" style={{ marginTop: '0.5rem' }}>
              {notes.map(note => (
                <li key={note.id} className="data-item">
                  <span>{note.title}</span>
                  <button 
                    onClick={() => handleOpenMaterial(note.url, note.title)}
                    className="btn-primary" 
                    style={{ padding: '0.4rem 1rem', display: 'inline-block', width: 'auto', textAlign: 'center' }}
                  >
                    Open Material
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesModule;
