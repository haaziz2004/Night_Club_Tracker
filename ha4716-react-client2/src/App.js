import React, { Component } from 'react';
import './App.css';
import './clubs.css';



class NightclubCapacity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: {
        'Club Arcane': { occupancy: 0, color: 'lightgreen' },
        'Club Underground': { occupancy: 0, color: 'lightgreen' },
        'Club Soda': { occupancy: 0, color: 'lightgreen' },
        'Studio 52': { occupancy: 0, color: 'lightgreen' },
      },
      selectedClub: null,
      messages: {
        'Club Arcane': '',
        'Club Underground': '',
        'Club Soda': '',
        'Studio 52': '',
      },
    };
  }

  getColor = (clubName) => {
    const { clubs, messages } = this.state;
    const occupancy = clubs[clubName].occupancy;

    if (occupancy < clubCapacities[clubName].yellowThreshold) {
      return 'lightgreen';
    } else if (occupancy < clubCapacities[clubName].maxCapacity) {
      return '#EFFD5F';
    } else if (occupancy == clubCapacities[clubName].maxCapacity) {
      return '#FF0800';
    }
    if (occupancy == 0) {
      return 'lightgreen';
    }
  };

  updateMessage = () => {
    const { clubs, messages } = this.state;
    const newMessages = { ...messages };

    Object.keys(clubs).forEach((clubName) => {
      const occupancy = clubs[clubName].occupancy;

      if (occupancy < clubCapacities[clubName].yellowThreshold) {
        newMessages[clubName] = 'Welcome!';
      } else if (occupancy < clubCapacities[clubName].maxCapacity) {
        newMessages[clubName] = 'Warn the bouncers…';
      } else if (occupancy == clubCapacities[clubName].maxCapacity) {
        newMessages[clubName] = 'No one allowed in!';
      }
      if (occupancy == 0) {
        newMessages[clubName] = '';
      }

      const color = this.getColor(clubName);
      clubs[clubName].color = color;
    });

    this.setState({ messages: newMessages, clubs });
  };

  handleCapacityChange = (operation) => {
    const { clubs, selectedClub } = this.state;

    if (selectedClub) {
      const currentOccupancy = clubs[selectedClub].occupancy;

      if (operation == 'increment' && currentOccupancy < clubCapacities[selectedClub].maxCapacity) {
        const updatedOccupancy = currentOccupancy + 1;
        const updatedClubs = {
          ...clubs,
          [selectedClub]: { ...clubs[selectedClub], occupancy: updatedOccupancy },
        };
        this.setState({ clubs: updatedClubs }, () => this.updateMessage());
      }

      if (operation == 'decrement' && currentOccupancy > 0) {
        const updatedOccupancy = currentOccupancy - 1;
        const updatedClubs = {
          ...clubs,
          [selectedClub]: { ...clubs[selectedClub], occupancy: updatedOccupancy },
        };
        this.setState({ clubs: updatedClubs }, () => this.updateMessage());
      }
    }
  };

  handleRadioChange = (event) => {
    this.setState({ selectedClub: event.target.value });
  };
  render() {
    const { clubs, selectedClub, messages } = this.state;

    return (
      <div>
        <div className="title">
          <h1>Nightclub Capacity</h1>
          <h3 className="sub-heading">
            Each time someone enters/leaves the club, select the correct club and click the appropriate button
          </h3>
        </div>
        <div className="club-container">
          {Object.keys(clubs).map((clubName) => (
            <div className="club" key={clubName} id={clubName} style={{ backgroundColor: clubs[clubName].color }}>
            <h2>{clubName}</h2>
              <div className="occupancy">
                <p className="message">{messages[clubName]}</p>
                <p className="count">{clubs[clubName].occupancy}</p>
              </div>
            </div>
          ))}
        </div>
        <span className="club-selector">
          {Object.keys(clubs).map((clubName) => (
            <div key={clubName}>
              <input
                type="radio"
                name="club"
                value={clubName}
                id={clubName}
                onChange={this.handleRadioChange}
              />
              <label htmlFor={clubName}>{clubName}</label>
              <br/>
            </div>
          ))}
        </span>
        <button onClick={() => this.handleCapacityChange('increment')} id="plus"> + </button>
        <button onClick={() => this.handleCapacityChange('decrement')} id="minus"> - </button>
      </div>
    );
  }
}

const clubCapacities = {
  'Club Arcane': { maxCapacity: 100, yellowThreshold: 70 },
  'Club Underground': { maxCapacity: 50, yellowThreshold: 30 },
  'Club Soda': { maxCapacity: 20, yellowThreshold: 12 },
  'Studio 52': { maxCapacity: 52, yellowThreshold: 32 },
};

export default NightclubCapacity;
