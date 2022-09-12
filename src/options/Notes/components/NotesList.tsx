import React from 'react';
import Note from './Note';

const NotesList = ({ notes }) => {
  return (
    <div className="notes-list">
      {notes.map((note, i) => (
        <Note
          key={i}
          id={note.id}
          title={note.title}
          content={note.content}
          category={note.category}
          date={note.date}
        />
      ))}
    </div>
  );
};

export default NotesList;
