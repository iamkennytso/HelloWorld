import React, { Component } from 'react';
import axios from 'axios'
import './App.scss';

const INITIAL_STATE = {
  hello: ''
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  };

  componentDidMount () {
    this.getHello()
  };

  getHello = async () => {
    try {
      const { data: hello } = await axios.get('https://boiler010919-81804.firebaseio.com/hello.json');
      this.setState({ hello });
    } catch (err) {
      console.error(err)
      this.setState({ hello: 'localHost'});
    }
  }

  render() {
    return (
      <div className="App">
        Hello {this.state.hello}
      </div>
    );
  }
}

export default App;
