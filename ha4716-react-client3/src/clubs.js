import React from 'react';

const Club = ({ clubName, color, message, occupancy }) => {
  return (
    <div className="club" key={clubName} id={clubName} style={{ backgroundColor: color }}>
      <h2>{clubName}</h2>
      <div className="occupancy">
        <p className="message">{message}</p>
        <p className="count">{occupancy}</p>
      </div>
    </div>
  );
};

export default Club;
