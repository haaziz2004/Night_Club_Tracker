import React, { useState, useEffect } from 'react';
import './modal.css';

export const EditModal = ({ isOpen, toggleModal, editClub, clubData }) => {
  const [editedClubData, setEditedClubData] = useState({ ...clubData });

  useEffect(() => {
    setEditedClubData({ ...clubData });
  }, [clubData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedClubData((prevData) => ({ ...prevData, [name]: value }));
  };

  const saveChanges = () => {
    console.log(editedClubData)
    editClub(editedClubData); 

    toggleModal();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <span className="close" onClick={toggleModal}>
          &times;
        </span>
        <h2>Edit Club</h2>
        <label>Name: </label>
        <input
          type="text"
          id="name"
          name="clubName" // Update the name attribute to match the data key
          value={editedClubData.clubName} // Use the correct key from editedClubData
          onChange={handleInputChange}
          placeholder={clubData.clubData.clubName}
        />

        <label>Genre: </label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={editedClubData.genre}
          onChange={handleInputChange}
          placeholder={clubData.clubData.genre}
        />

        <label>Location: </label>
        <input
          type="text"
          id="location"
          name="location"
          value={editedClubData.location}
          onChange={handleInputChange}
          placeholder={clubData.clubData.area}
        />

        <label>Yellow Threshold: </label>
        <input
          type="number"
          id="yellowThreshold"
          name="yellowThreshold"
          value={editedClubData.yellowThreshold}
          onChange={handleInputChange}
          placeholder={String(clubData.capacities.yellowThreshold)}
        />

        <label>Max Capacity: </label>
        <input
          type="number"
          id="maxCapacity"
          name="maxCapacity"
          value={editedClubData.maxCapacity}
          onChange={handleInputChange}
          placeholder={String(clubData.capacities.maxCapacity)}
        />

        <button type="button" onClick={saveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
};
