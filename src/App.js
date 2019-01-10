import React, { Component } from 'react';
import axios from 'axios'
import './App.scss';

import ViewPage from './pages/ViewPage/ViewPage'
import AddClothing from './components/AddClothing/AddClothing'
import EditClothing from './components/EditClothing/EditClothing'

const INITIAL_STATE = {
  head: [],
  top: [],
  legs: [],
  feet: [],
  selected: null,
  nav: 'view',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  };

  componentDidMount () {
    this.getClothes()
  };

  getClothes = async () => {
    console.log('gettingClothes')
    try {
      const { data: clothes } = await axios.get('https://boiler010919-81804.firebaseio.com/clothes.json');
      const { head, top, legs, feet } = clothes
      this.setState({ head, top, legs, feet });
    } catch (err) {
      console.error(err)
      this.setState({ hello: 'localHost'});
    }
  }
  handleClothingClick = (selected, placement) => {
    selected.placement = placement
    this.setState({selected})
  }
  switchStatementRouter = () => {
    const { head, top, legs, feet, selected } = this.state
    switch(this.state.nav) {
      case 'view':
        return <ViewPage clothes={ {head, top, legs, feet} } clothingClick={this.handleClothingClick} />
    }
  }
  
  render() {
    const { head, top, legs, feet, selected } = this.state
    return (
      <div className="App">
        
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
