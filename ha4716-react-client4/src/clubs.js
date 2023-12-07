import React from 'react';


const Club = ({ clubName, color, message, occupancy, area, genre, incrementCapacity, decrementCapacity, doDelete, id,editClub}) => {
  return (
    <div className="club" key={clubName} id={clubName} style={{ backgroundColor: color }}>
      <div className="club-container">
        <button className= 'remove' onClick={() => doDelete(clubName)}>
            Remove
          </button>
          <button className= 'edit' onClick={() => editClub(clubName)}>
            Edit
          </button>
        <h2>{clubName}</h2>
        <p className="location">{area}</p>
        <p className="genre">{genre}</p>
        <p className="message">{message}</p>
        <div className='buttons'>
       
      <button className = 'plus' onClick={() => incrementCapacity( clubName)} id="plus">
        +
      </button>
      <button className = 'minus' onClick={() => decrementCapacity(clubName)} id="minus">
        -
      </button>
      
    </div>
    

        <p className="count">{occupancy}</p>
      </div>
    </div>
  );
};

export default Club;
