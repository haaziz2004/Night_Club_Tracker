import React, { Component } from 'react';
import './App.css';
import './clubs.css';
import Club from './clubs'; 
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CreateModal } from './dialogcreate';


class NightclubCapacity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: {
        'Club Arcane': { occupancy: 0, color: 'lightgreen', genre: 'Rock', location: 'Buffalo' },
        'Club Underground': { occupancy: 0, color: 'lightgreen' , genre: 'Pop', location: 'Rochester'},
        'Club Soda': { occupancy: 0, color: 'lightgreen', genre: 'Metal', location: 'London' },
        'Studio 52': { occupancy: 0, color: 'lightgreen', genre: 'Grunge', location:'Dubai' },
      },
      selectedClub: null,
      messages: {
        'Club Arcane': '',
        'Club Underground': '',
        'Club Soda': '',
        'Studio 52': '',
      },

      clubCapacities: {
        'Club Arcane': { maxCapacity: 100, yellowThreshold: 70 },
        'Club Underground': { maxCapacity: 50, yellowThreshold: 30 },
        'Club Soda': { maxCapacity: 20, yellowThreshold: 12 },
        'Studio 52': { maxCapacity: 52, yellowThreshold: 32 },
      },
      filterCity: '',
      isModalOpen: false,

      
    };
  }

  //componentDidMount() {
  //  fetch('http://localhost:5000/NightClub')
     // .then((response) => response.json())
      //.then((data) => {
       // this.setState({ clubs: data });
     // })
     // .catch((error) => {
      //  console.error('Error fetching data:', error);
     // });
 // }

  toggleModal = () => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };
  createClub = (newClubData) => {
    const { clubs } = this.state;
    const newClubs = Object.keys(newClubData).reduce((acc, clubName) => {
      acc[clubName] = {
        ...newClubData[clubName],
        occupancy: 0, 
      };
      return acc;
    }, {});
  
    this.setState({
      clubs: {
        ...clubs,
        ...newClubs,
      },
    });
  };

  handleRemoveClub = (clubName) => {
    const { clubs, messages, clubCapacities } = this.state;
    const updatedClubs = { ...clubs };
    const updatedMessages = { ...messages };
    const updatedCapacities = { ...clubCapacities };
  
    delete updatedClubs[clubName];
    delete updatedMessages[clubName];
    delete updatedCapacities[clubName];
  
    this.setState({
      clubs: updatedClubs,
      messages: updatedMessages,
      clubCapacities: updatedCapacities,
    });
  };
  

  handleFilterChange = (event) => {
    this.setState({ filterCity: event.target.value });
  };

  filteredClubs = () => {
    const { clubs, filterCity, messages } = this.state;
    if (!filterCity) {
      return Object.keys(clubs).map((clubName) => (
        <Club
        key={clubName}
        clubName={clubName}
        color={clubs[clubName].color}
        area={clubs[clubName].location}
        genre={clubs[clubName].genre}
        message={messages[clubName]}
        occupancy={clubs[clubName].occupancy}
        handleCapacityChange={this.handleCapacityChange}
        handleRemoveClub={this.handleRemoveClub}


        />
      ));
    } else {
      return Object.keys(clubs)
        .filter((clubName) => clubs[clubName].location.toLowerCase().includes(filterCity.toLowerCase()))
        .map((clubName) => (
          <Club
          key={clubName}
          clubName={clubName}
          color={clubs[clubName].color}
          area={clubs[clubName].location}
          genre={clubs[clubName].genre}
          message={messages[clubName]}
          occupancy={clubs[clubName].occupancy}
          handleCapacityChange={this.handleCapacityChange}
          handleRemoveClub={this.handleRemoveClub}

          />
        ));
    }
  };


  getColor = (clubName) => {
    const { clubs, clubCapacities } = this.state;
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
    const { clubs, messages, clubCapacities } = this.state;
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

  incrementCapacity = (clubName) => {
    const { clubs,clubCapacities } = this.state;
    const currentOccupancy = clubs[clubName].occupancy;
  
    if (currentOccupancy < clubCapacities[clubName].maxCapacity) {
      const updatedOccupancy = currentOccupancy + 1;
      const updatedClubs = {
        ...clubs,
        [clubName]: { ...clubs[clubName], occupancy: updatedOccupancy },
      };
      this.setState({ clubs: updatedClubs }, () => this.updateMessage());
    }
  };
  
  decrementCapacity = (clubName) => {
    const { clubs } = this.state;
    const currentOccupancy = clubs[clubName].occupancy;
  
    if (currentOccupancy > 0) {
      const updatedOccupancy = currentOccupancy - 1;
      const updatedClubs = {
        ...clubs,
        [clubName]: { ...clubs[clubName], occupancy: updatedOccupancy },
      };
      this.setState({ clubs: updatedClubs }, () => this.updateMessage());
    }
  };
  
  handleCapacityChange = (operation, clubName) => {
    if (operation === 'increment') {
      this.incrementCapacity(clubName);
    } else if (operation === 'decrement') {
      this.decrementCapacity(clubName);
    }
  };

  
  render() {
    const { clubs, messages, filterCity, isModalOpen } = this.state;

    return (
      <div>
        <div className="title">
          <h1>Nightclub Capacity</h1>
          <h3 className="sub-heading">
            Each time someone enters/leaves the club, select the correct club and click the appropriate button
          </h3>
        </div>
        <div className="club-container">
          {this.filteredClubs()}
        </div>
        <input
          type="text"
          placeholder="Filter by city..."
          value={filterCity}
          onChange={this.handleFilterChange}
        />
        <div>
          <button className = "add" onClick={this.toggleModal}>Add New Club</button>
          </div>
        <CreateModal isOpen={isModalOpen} toggleModal={this.toggleModal} createClub={this.createClub} />
        </div>
      
    );
  }
}



export default NightclubCapacity;
