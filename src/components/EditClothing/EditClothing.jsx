import React, { Component } from 'react';
import axios from 'axios'
import './EditClothing.scss'

const INITIAL_STATE = {
  warmth: '',
  color: '',
  formal: '',
};

class EditClothing extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  };

  handleChange = field => e => {
    this.setState({ [field]: e.target.value })
  }

  editClothing = () => {
    const { selected, clothes } = this.props
    const clothingArticles = clothes[selected.placement]
    const indexOfEdit = clothingArticles.findIndex(article => article.title === selected.title)
    const editedClothing = {...clothingArticles[indexOfEdit], ...this.isDirty(this.state)}
    axios.put(`https://boiler010919-81804.firebaseio.com/clothes/${selected.placement}/${indexOfEdit}.json`, editedClothing)
      .then(payload => {
        // console.log(payload)
        this.props.getClothes()
      })
      .catch(err => console.error(err))
  }

  deleteClothing = () => {
    const { selected, clothes } = this.props
    const clothingArticles = clothes[selected.placement]
    const indexOfEdit = clothingArticles.findIndex(article => article.title === selected.title)
    axios.delete(`https://boiler010919-81804.firebaseio.com/clothes/${selected.placement}/${indexOfEdit}.json`)
      .then(payload => {
        // console.log(payload)
        this.props.getClothes()
      })
      .catch(err => console.error(err))
  }

  isDirty = obj => {
    const newObj = {};
    for (let key in obj) {
      if (obj[key]) newObj[key] = obj[key];
    }
    return newObj;
  }

  placementSelect = () => <select onChange={this.handleChange('placement')}>
    <option value="head">Head</option>
    <option value="top">Top</option>
    <option value="legs">Legs</option>
    <option value="feet">Feet</option>
  </select>

  render() {
    const { selected } = this.props
    return (
      <div className="EditClothing">
        {selected
        ? <div className="EditClothing-Edit">
            Edit/Delete a peice of Clothing! <br />
            Name: {selected.title} <br />
            Color: <input type='text' name='name' onChange={this.handleChange('color')} /> <br />
            Formal (out of 5): <input type='text' name='name' onChange={this.handleChange('formal')} /> <br />
            Warmth (out of 5): <input type='text' name='name' onChange={this.handleChange('warmth')} /> <br />
            <button onClick={this.editClothing} > Edit Clothing </button> <br />
            <button onClick={this.deleteClothing} > DELETE </button>
          </div>
        : <div className="EditClothing-Click">
            Click on a clothing article above to edit
          </div>
        }
      </div>
    );
  }
}

export default EditClothing;
