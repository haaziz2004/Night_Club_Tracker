import React from 'react';

const Controls = ({ clubs, selectedClub, handleRadioChange, handleCapacityChange }) => {
  return (
    <div>
      <span className="club-selector">
        {Object.keys(clubs).map((clubName) => (
          <div key={clubName}>
            <input
              type="radio"
              name="club"
              value={clubName}
              id={clubName}
              onChange={handleRadioChange}
              checked={selectedClub === clubName}
            />
            <label htmlFor={clubName}>{clubName}</label>
            <br />
          </div>
        ))}
      </span>
      <button onClick={() => handleCapacityChange('increment')} id="plus">
        +
      </button>
      <button onClick={() => handleCapacityChange('decrement')} id="minus">
        -
      </button>
    </div>
  );
};

export default Controls;
