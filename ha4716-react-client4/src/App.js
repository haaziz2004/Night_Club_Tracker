import React, { Component } from 'react';
import './App.css';
import './clubs.css';
import Club from './clubs'; 
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CreateModal } from './dialogcreate';
import { EditModal } from './dialogedit';
import 'bootstrap/dist/css/bootstrap.min.css';


class NightclubCapacity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: {},
      selectedClub: null,
      messages: {},
      clubCapacities: {},
      filterCity: '',
      isModalOpen: false,
      isEditModalOpen: false,
      newClubData: {
        name: '',
        genre: '',
        location: '',
        yellowThreshold: 10,
        maxCapacity: 20,
      },
    };
  }
  
//GET
  updateData = (apiResponse) => {
    const updatedClubs = {};
    const updatedMessages = {};
    const updatedCapacities = {};
  
    apiResponse.forEach((clubData) => {
      const clubName = clubData[1];
      updatedClubs[clubName] = {
        area: clubData[3],
        genre: clubData[2],
        clubName: clubData[1],
        occupancy: clubData[4],
        id: clubData[0],
      };

      updatedMessages[clubName] = '';
      updatedCapacities[clubName] = {
        maxCapacity: clubData[6],
        yellowThreshold: clubData[5],
      };
    });
  
    this.setState(
      {
        clubs: updatedClubs,
        messages: updatedMessages,
        clubCapacities: updatedCapacities,
      },
      () => {
        this.updateMessage(); 
      }
    );


  

    };

  fetchData = () => {
    fetch('http://localhost:5000/NightClub')
    .then(
        (response) => 
        {
           if (response.status === 200)
           {
              return (response.json()) ;
           }
           else
           {
               console.log("HTTP error:" + response.status + ":" +  response.statusText);
               return ([ ["status ", response.status]]);
           }
        }
        )
    .then ((jsonOutput) => 
             {
                 this.updateData(jsonOutput);
             }
         )
   .catch((error) => 
           {console.log(error);
               this.updateData("");
            } )
  }

  componentDidMount(){
    this.fetchData();
    this.updateMessage();

  }

  //MODAL

  toggleModal = () => {
    const { newClubData } = this.state;

    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }));
    this.setState({
      newClubData: {
        name: '',
        genre: '',
        location: '',
        yellowThreshold: 10,
        maxCapacity: 20,
      },
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newClubData: {
        ...prevState.newClubData,
        [name]: value,
      },
    }));
  };


  toggleEditModal = (clubName) => {
    const { clubs, clubCapacities } = this.state;
    const selectedClubData = {
      clubData: clubs[clubName],
      capacities: clubCapacities[clubName],
    };
  
    this.setState((prevState) => ({
      isEditModalOpen: !prevState.isEditModalOpen,
      selectedClub: selectedClubData,
    }), () => {
      console.log(this.state.selectedClub); 
    });
  };
  
 //CREATE 

  createClub = () => {
   
    const { newClubData } = this.state;

     
    console.log(newClubData);

    fetch(`http://localhost:5000/NightClub`, {
      method: 'POST',
      body: JSON.stringify({
        name: newClubData.name,
        genre: newClubData.genre,
        location: newClubData.location,
        yellowThreshold: newClubData.yellowThreshold,
        max: newClubData.maxCapacity,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          this.fetchData();
          this.setState({
            newClubData: {
              name: '',
              genre: '',
              location: '',
              yellowThreshold: 10,
              maxCapacity: 20,
            },
            isModalOpen: false,
          });
        } else {
          console.log('Failed to create club');
        }
      })
      .catch((error) => {
        console.error('Error creating club:', error);
      });
  };

  editClub = (newClubData) => {
    const { clubs, clubCapacities } = this.state;
    const clubName = Object.keys(newClubData)[0]; 
     
    console.log(newClubData);

    fetch(`http://localhost:5000/NightClub`, {
      method: 'PUT',
      body: JSON.stringify({
        name: newClubData.clubName,
        genre: newClubData.genre,
        location: newClubData.location,
        yellowThreshold: newClubData.yellowThreshold,
        max: newClubData.maxCapacity,
        id: newClubData.clubData.id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          this.fetchData()
        } else {
          console.log('Failed to create club');
        }
      })
      .catch((error) => {
        console.error('Error creating club:', error);
      });

  };

  //REMOVE

  doDelete = (clubName) => {
    const { clubs } = this.state;
    const club = clubs[clubName];
    
    fetch(`http://localhost:5000/Delete/${club.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          this.fetchData()
        } else {
          console.log('Failed to delete club');
        }
      })
      .catch((error) => {
        console.error('Error deleting club:', error);
      });
  };
  

  
  //FILTER 

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
        area={clubs[clubName].area}
        genre={clubs[clubName].genre}
        message={messages[clubName]}
        occupancy={clubs[clubName].occupancy}
        incrementCapacity={this.incrementCapacity}
        decrementCapacity={this.decrementCapacity}
        doDelete={this.doDelete}
        id ={clubName.id}
        editClub={this.toggleEditModal}


        />
      ));
    } else {
      return Object.keys(clubs)
        .filter((clubName) => clubs[clubName].area.toLowerCase().includes(filterCity.toLowerCase()))
        .map((clubName) => (
          <Club
          key={clubName}
          clubName={clubName}
          color={clubs[clubName].color}
          area={clubs[clubName].area}
          genre={clubs[clubName].genre}
          message={messages[clubName]}
          occupancy={clubs[clubName].occupancy}
          incrementCapacity={this.incrementCapacity}
          decrementCapacity={this.decrementCapacity}
          doDelete={this.doDelete}
          editClub={this.toggleEditModal}


          />
        ));
    }
  };

  //CHANGE COLOR 

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

  //UPDATES MESSAGE 

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
      const { clubs, clubCapacities } = this.state;
      const club = clubs[clubName];
      const currentOccupancy = clubs[clubName].occupancy;
    
      if (currentOccupancy < clubCapacities[clubName].maxCapacity) {
        fetch(`http://localhost:5000/increment`, {
          method: 'PUT',
          body: JSON.stringify({
            id: club.id,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => {
            if (response.ok) {
              this.fetchData();
              this.updateMessage();
              
            } else {
              console.log('Failed to increment occupancy');
            }
          })
          .catch((error) => {
            console.error('Error incrementing:', error);
          });
      }
    };
  
  
  decrementCapacity = (clubName) => {
    const { clubs, clubCapacities } = this.state;
    const club = clubs[clubName];
    const currentOccupancy = clubs[clubName].occupancy;
    
  
    if (currentOccupancy > 0) {
      fetch(`http://localhost:5000/decrement`, {
          method: 'PUT',
          body: JSON.stringify({
            id: club.id,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => {
            if (response.ok) {
              this.fetchData();
              this.updateMessage();
            } else {
              console.log('Failed to decrement occupancy');
            }
          })
          .catch((error) => {
            console.error('Error decrementing:', error);
          });
    }
  };
  
  render() {
    const { clubs, messages, filterCity, isModalOpen , isEditModalOpen,selectedClub, newClubData} = this.state;

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
        className='filter'
          type="text"
          placeholder="Filter by city..."
          value={filterCity}
          onChange={this.handleFilterChange}
        />
        <div>
          <Button className="add" onClick={this.toggleModal}>+Add New Club+</Button>
          </div>
          <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Create Club</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Name:</Label>
                <Input type="text" id="name" name="name" value={newClubData.name} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="genre">Genre:</Label>
                <Input type="text" id="genre" name="genre" value={newClubData.genre} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="location">Location:</Label>
                <Input type="text" id="location" name="location" value={newClubData.location} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="yellowThreshold">Yellow Threshold:</Label>
                <Input type="number" id="yellowThreshold" name="yellowThreshold" value={newClubData.yellowThreshold} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="maxCapacity">Max Capacity:</Label>
                <Input type="number" id="maxCapacity" name="maxCapacity" value={newClubData.maxCapacity} onChange={this.handleInputChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.createClub}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <EditModal isOpen={isEditModalOpen} toggleModal={this.toggleEditModal} editClub={this.editClub} clubData = {selectedClub}/>

      </div>
      
    );
  }
}



export default NightclubCapacity;
