import React from 'react';
import { useNavigate } from 'react-router-dom';

const Note = ({ id, title, content, category }) => {
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
      </div>
    </div>
  );
};

export default Note;
