import React, { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import Header from './components/Header';
import { Link, useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getStoredNotes } from '../../utils/storage';

// function getParams(query) {
//   query.map(q => {
//     if(q)
//   })
// }

const Notes: React.FC<{}> = () => {

  const [notes, setNotes] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

  // const query = window.location.search

  // const queryCategories = query

  const [searchParams] = useSearchParams();
  let queryCategories = []
  for (const entry of searchParams.entries()) {
    queryCategories.push(entry[1]);
  }
  console.log(queryCategories, "queryCategories")

  useEffect(() => {
    let savedNotes
    getStoredNotes().then((storedNotes) => {
      savedNotes = storedNotes
      console.log(savedNotes, 'savedNotes');
      if (Array.isArray(savedNotes)) {
        if(!queryCategories) {
          setNotes(savedNotes);
        } else if(queryCategories && queryCategories.length) {
          let matchingCategories = queryCategories.map(qCategory => {
            const temp = savedNotes.map(note => {
              const temp2 = note.category.map(categ => {
                if(categ === qCategory) {
                  console.log(qCategory, "qCategory")
                  return note
                }
              })
              console.log(temp2, "temp2")
              return temp2[0]
            })
            console.log(temp, "temp")
            return temp[0]
          
          })
          matchingCategories = matchingCategories.filter(function (element) {
            return element !== undefined;
        });
          console.log(matchingCategories, "matchingCategories")
          setNotes(matchingCategories)
        } else {
          setNotes(savedNotes)
        }
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
