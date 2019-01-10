import React, { Component } from 'react';
import axios from 'axios'
import './App.scss';

const INITIAL_STATE = {
  head: [],
  top: [],
  legs: [],
  feet: [],
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

  render() {
    return (
      <div className="App">
        <pre><code>{JSON.stringify(this.state, null, 4)}</code></pre>
      </div>
    );
  }
}

export default App;
