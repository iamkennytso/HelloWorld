import React, { Component } from 'react';
import axios from 'axios'
import './App.scss';

import ViewPage from './pages/ViewPage/ViewPage'

const INITIAL_STATE = {
  head: [],
  top: [],
  legs: [],
  feet: [],
  current: [],
  nav: 'view'
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
    try {
      const { data: clothes } = await axios.get('https://boiler010919-81804.firebaseio.com/clothes.json');
      const { head, top, legs, feet } = clothes
      this.setState({ head, top, legs, feet });
    } catch (err) {
      console.error(err)
      this.setState({ hello: 'localHost'});
    }
  }

  switchStatementRouter = () => {
    const { head, top, legs, feet, current } = this.state
    switch(this.state.nav) {
      case 'view':
        return <ViewPage clothes={ {head, top, legs, feet,} } />
    }
  }
  render() {
    return (
      <div className="App">
        {this.switchStatementRouter()}
      </div>
    );
  }
}

export default App;
