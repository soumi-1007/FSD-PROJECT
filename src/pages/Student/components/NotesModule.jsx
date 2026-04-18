import React from 'react';
import { mockNotes } from '../../../utils/mockData';

const NotesModule = () => {
  // Group notes by subject for structured display
  const notesBySubject = mockNotes.reduce((acc, note) => {
    if (!acc[note.subject]) acc[note.subject] = [];
    acc[note.subject].push(note);
    return acc;
  }, {});

  return (
    <div className="module-card">
      <h2>Study Notes & Materials</h2>
      <div style={{ marginTop: '1.5rem' }}>
        {Object.entries(notesBySubject).map(([subject, notes]) => (
          <div key={subject} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', color: 'var(--primary)' }}>{subject}</h3>
            <ul className="data-list" style={{ marginTop: '0.5rem' }}>
              {notes.map(note => (
                <li key={note.id} className="data-item">
                  <span>{note.title}</span>
                  <a href={note.url} className="btn-primary" style={{ textDecoration: 'none', padding: '0.4rem 1rem', display: 'inline-block', width: 'auto', textAlign: 'center' }} onClick={(e) => { e.preventDefault(); alert('Downloading '+note.title);}}>View</a>
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
