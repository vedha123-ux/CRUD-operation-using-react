import React from 'react';

const DataDetails = ({ item, onClose }) => {
  return (
    <div className="itemDetails">
      <h2>Item Details</h2>
      <p><strong>ID:</strong> {item.id}</p>
      <p><strong>Name:</strong> {item.name}</p>
      <p><strong>Price:</strong> ${item.price}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DataDetails;


