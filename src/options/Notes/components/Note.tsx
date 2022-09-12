import React from 'react';
import { useNavigate } from 'react-router-dom';

const Note = ({ id, title, content, category, date }) => {
  const navigate = useNavigate();

  const handleOpenEditor = () => {
    console.log(id);
    navigate(`/noteEditor/${id}`, {replace: true});
  };

  return (
    <div className="note">
      <div onClick={() => handleOpenEditor()}>
        <div className="note-header">
          <span>{title}</span>
          <span>{category}</span>
        </div>
        <p className="content">{content.substring(0, 100)}</p>
      </div>
      <div className="note-footer">
        <small>{date}</small>
      </div>
    </div>
  );
};

export default Note;
