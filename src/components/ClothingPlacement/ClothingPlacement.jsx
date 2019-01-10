import React, { Component } from 'react';
import './ClothingPlacement.scss';
import ClothingArticle from '../ClothingArticle/ClothingArticle';
import { timingSafeEqual } from 'crypto';

const INITIAL_STATE = {
  show: true
};

class ClothingPlacement extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  };

  toggleShow = () => {
    this.setState({ show: !this.state.show })
  }

  render () {
    const { placement, clothes, clothingClick } = this.props
    return (
      <div className={`ClothingPlacement ClothingPlacement-${placement}`}>
        <div className='ClothingPlacement-Title' onClick={this.toggleShow}>
          {placement}
        </div>
        {this.state.show 
        ? <div className='ClothingPlacement-Container'>
            {clothes.map(article => {
              return <ClothingArticle key={article.title} article={article} clothingClick={clothingClick} placement={placement} />
            })}
          </div>
        : null}
      </div>
    );
  }
};

export default ClothingPlacement;

