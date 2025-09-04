import React, { useState } from 'react';

const Review = ({ item, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    onDelete(item.id); // Pass the item's ID to the parent component for deletion
  };

  return (
    <article className="review">
      <div className="item-info">
        <h4>{item.name}</h4>
        <button onClick={toggleDescription}>
          {expanded ? 'Hide Description' : 'Show Description'}
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>
      {expanded && <p className="description">{item.description}</p>}
    </article>
  );
};

export default Review;
