import React, { useState } from 'react';
import './App.css';
import './clubs.css';

const NightclubCapacity = () => {
  // Define club names and initial capacities
  const initialClubs = {
    'Club Arcane': 0,
    'Club Underground': 0,
    'Club Soda': 0,
    'Studio 52': 0,
  };

  // Use state to keep track of club capacities
  const [clubs, setClubs] = useState(initialClubs);

  // Function to handle incrementing or decrementing club capacity
  const handleCapacityChange = (club, operation) => {
    setClubs((prevClubs) => {
      const updatedClubs = { ...prevClubs };
      if (operation === 'increment') {
        updatedClubs[club]++;
      } else if (operation === 'decrement' && updatedClubs[club] > 0) {
        updatedClubs[club]--;
      }
      return updatedClubs;
    });
  };

  return (
    <div>
      <div className="title">
        <h1>Nightclub Capacity</h1>
        <h3 className="sub-heading">
          Each time someone enters/leaves the club, select the correct club and click the appropriate button
        </h3>
      </div>
      <div className="club-container">
        {/* Render each club */}
        {Object.keys(clubs).map((clubName) => (
          <div className="club" key={clubName}>
            <h2>{clubName}</h2>
            <div className="occupancy">
              <p className="message"></p>
              {/* Display club count from state */}
              <p className="count">{clubs[clubName]}</p>
            </div>
          </div>
        ))}
      </div>
        {/* Radio buttons for club selection */}
        <span className="club-selector">
          {Object.keys(clubs).map((clubName) => (
            <div key={clubName}>
              <input
                type="radio"
                name="club"
                value={clubName}
                id={clubName}
                onChange={() => console.log(`Selected ${clubName}`)} // Add your logic for selected club
              />
              <label htmlFor={clubName}>{clubName}</label>
              <br />
            </div>
          ))}
        </span>
        {/* Buttons for capacity change */}
        
        <button onClick={() => handleCapacityChange('Club Arcane', 'increment')} id="plus-button">
          +
        </button>
        
        <button onClick={() => handleCapacityChange('Club Arcane', 'decrement')} id="minus-button">
          -
        </button>
      
    </div>
  );
};

export default NightclubCapacity;
