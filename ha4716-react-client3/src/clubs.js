import React from 'react';


const Club = ({ clubName, color, message, occupancy, area, genre,handleCapacityChange }) => {
  return (
    <div className="club" key={clubName} id={clubName} style={{ backgroundColor: color }}>
      <div className="club-container">
        <h2>{clubName}</h2>
        <p className="location">{area}</p>
        <p className="genre">{genre}</p>
        <p className="message">{message}</p>
        <div className='buttons'>
       
      <button className = 'plus' onClick={() => handleCapacityChange('increment', clubName)} id="plus">
        +
      </button>
      <button className = 'minus' onClick={() => handleCapacityChange('decrement', clubName)} id="minus">
        -
      </button>
    </div>

        <p className="count">{occupancy}</p>
      </div>
    </div>
  );
};

export default Club;
