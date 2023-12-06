import React, { useState } from 'react';
import './modal.css'
export const CreateModal = ({ isOpen, toggleModal, createClub }) => {
    const [clubData, setClubData] = useState({
      name: '',
      genre: '',
      location: '',
      yellowThreshold: 10,
      maxCapacity: 20,
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setClubData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const save = () => {
      createClub({
        [clubData.name]: {
          name: clubData.name,
          genre: clubData.genre,
          location: clubData.location,
          yellowThreshold: parseInt(clubData.yellowThreshold, 10),
          maxCapacity: parseInt(clubData.maxCapacity, 10),
        },
      });
      setClubData({
        name: '',
        genre: '',
        location: '',
        yellowThreshold: 10,
        maxCapacity: 20,
      });
      toggleModal(); 
    };
  
    if (!isOpen) {
      return null; 
    }

    const cancel = () => {
      setClubData({
        name: '',
        genre: '',
        location: '',
        yellowThreshold: 10,
        maxCapacity: 20,
      });
      toggleModal(); 
    };
  
    return (
      <div className="modal-container">
        <div className="modal-content">
          <span className="close" onClick={toggleModal}>&times;</span>
          <button className = "x" type="button" onClick={cancel}>
          x
        </button>
          <h2>Create Club</h2>
          <label>Name: </label>
          <input type="text" id="name" name="name" value={clubData.name} onChange={handleInputChange} />
  
          <label>Genre: </label>
          <input type="text" id="genre" name="genre" value={clubData.genre} onChange={handleInputChange} />
  
          <label>Location: </label>
          <input type="text" id="location" name="location" value={clubData.location} onChange={handleInputChange} />
  
          <label>Yellow Threshold: </label>
          <input type="number" id="yellowThreshold" name="yellowThreshold" value={clubData.yellowThreshold} onChange={handleInputChange} />
  
          <label>Max Capacity: </label>
          <input type="number" id="maxCapacity" name="maxCapacity" value={clubData.maxCapacity} onChange={handleInputChange} />
  
          <button type="button" onClick={save}>
            Save
          </button>
        </div>
      </div>
    );
  };
  