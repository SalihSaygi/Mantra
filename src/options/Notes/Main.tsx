import React, { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import Header from './components/Header';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getStoredNotes } from '../../utils/storage';

const Notes: React.FC<{}> = () => {

  const [notes, setNotes] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let savedNotes
    getStoredNotes().then((storedNotes) => {
      savedNotes = storedNotes
      console.log(savedNotes, 'savedNotes');
      if (Array.isArray(savedNotes)) {
        setNotes(savedNotes);
      }
    })
  }, []);

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        {notes ? <NotesList notes={notes} /> : <p>No Notes</p>}
        <Link to={`/noteEditor/${nanoid()}`}>New Note</Link>
        <br />
        <Link to="/categories">Categories</Link>
      </div>
    </div>
  );
};

export default Notes;
