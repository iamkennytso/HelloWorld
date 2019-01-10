import React, { Component } from 'react';
import axios from 'axios'
import './AddClothing.scss';

const INITIAL_STATE = {
  title: '',
  placement: 'head',
  warmth: '',
  color: '',
  formal: '',
};

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  };

  handleChange = field => e => {
    console.log(field)
    console.log(e)
    this.setState({ [field]: e.target.value })
  }
  addClothing = () => {
    const clothingArticles = this.props.clothes[this.state.placement]
    const newClothing = {...this.state}
    delete newClothing.placement
    clothingArticles.push(newClothing)
    axios.put(`https://boiler010919-81804.firebaseio.com/clothes/${this.state.placement}.json`, clothingArticles)
      .then(payload => this.props.getClothes())
      .catch(err => console.error(err))
  }
  placementSelect = () => <select onChange={this.handleChange('placement')}>
    <option value="head">Head</option>
    <option value="top">Top</option>
    <option value="legs">Legs</option>
    <option value="feet">Feet</option>
  </select>

  render() {
    return (
      <div className="AddClothing">
        Add a peice of Clothing! <br />
        Placement: {this.placementSelect()} <br />
        Name: <input type='text' name='name' onChange={this.handleChange('title')} /> <br />
        Color: <input type='text' name='name' onChange={this.handleChange('color')} /> <br />
        Formal (out of 5): <input type='text' name='name' onChange={this.handleChange('formal')} /> <br />
        Warmth (out of 5): <input type='text' name='name' onChange={this.handleChange('warmth')} /> <br />
        <button onClick={this.addClothing} > Add Clothing </button>
      </div>
    );
  }
}

export default Add;
