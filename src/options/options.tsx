import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react';
import './options.css'
// import Notes from './Notes/Main';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import Categories from './Categories/Main';
import Editor from './Editor/Main';
import Categories from './Categories/Main';
import Notes from './Notes/Main';
import Landing from './Landing';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'


const Options: React.FC<{}> = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="notes" element={<Notes />}/>
          <Route path='noteEditor'>
            <Route path=":id" element={<Editor />}/>
          </Route>
          <Route path="categories" element={<Categories /> }/>
        </Routes>
      </Router>
    </div>
  );
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<Options />, root)
