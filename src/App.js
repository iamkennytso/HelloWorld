import React, { Component } from 'react';
import axios from 'axios'
import './App.scss';

import ViewPage from './pages/ViewPage/ViewPage'
import AddClothing from './components/AddClothing/AddClothing'
import EditClothing from './components/EditClothing/EditClothing'
import ViewOptions from './components/ViewOptions/ViewOptions'

const INITIAL_STATE = {
  clothes: {},
  head: [],
  top: [],
  legs: [],
  feet: [],
  selected: null,
  nav: 'view',
  viewOptions: {
    warmth: '',
    formal: '',
    color: '',
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  };

  componentWillMount () {
    this.getClothes();
  };

  getClothes = async () => {
    try {
      const { data: clothes } = await axios.get('https://boiler010919-81804.firebaseio.com/clothes.json');
      const { head, top, legs, feet } = clothes;
      this.setState({ head, top, legs, feet, clothes });
    } catch (err) {
      console.error(err);
      this.setState({ hello: 'localHost'});
    }
  }

  handleClothingClick = (selected, placement) => {
    selected.placement = placement;
    this.setState({ selected });
  }

  handleViewOptionChange = field => e => {
    const { head, top, legs, feet } = this.state;
    const filteredHead = head.filter(item => String(item[field]).indexOf(String(e.target.value)) > -1);
    const filteredtop = top.filter(item => String(item[field]).indexOf(String(e.target.value)) > -1);
    const filteredlegs = legs.filter(item => String(item[field]).indexOf(String(e.target.value)) > -1);
    const filteredfeet = feet.filter(item => String(item[field]).indexOf(String(e.target.value)) > -1);
    this.setState({
      head: filteredHead,
      top: filteredtop,
      legs: filteredlegs,
      feet: filteredfeet,
      viewOptions: {
        ...this.state.viewOptions,
        [field]: e.target.value
      },
    });
  }

  clearViewOptions = () => {
    const { head, top, legs, feet } = this.state.clothes;
    this.setState({ head, top, legs, feet, viewOptions: INITIAL_STATE.viewOptions });
  }

  switchStatementRouter = () => {
    const { head, top, legs, feet } = this.state;
    switch(this.state.nav) {
      case 'view':
        return <ViewPage clothes={ {head, top, legs, feet} } clothingClick={this.handleClothingClick} />;
      default:
        return null;
    }
  }
  
  render() {
    const { head, top, legs, feet, selected, viewOptions } = this.state
    return (
      <div className="App">
        <ViewOptions 
          options={viewOptions} 
          handleViewOptionChange={this.handleViewOptionChange}
          clearViewOptions={this.clearViewOptions}
        />
        {this.switchStatementRouter()}
        <AddClothing 
          clothes={ {head, top, legs, feet} } 
          getClothes={this.getClothes}
        />
        <br/> <br/>
        <EditClothing 
          selected={selected} 
          clothes={ {head, top, legs, feet} } 
          getClothes={this.getClothes} 
        />
      </div>
    );
  }
}

export default App;
