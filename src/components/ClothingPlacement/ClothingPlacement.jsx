import React from 'react';
import './ClothingPlacement.scss';
import ClothingArticle from '../ClothingArticle/ClothingArticle';

const ClothingPlacement = ({placement, clothes, clothingClick}) => {
  return (
    <div className={`ClothingPlacement ClothingPlacement-${placement}`}>
      {placement} <br />
      <div className='ClothingPlacement-Container'>
        {clothes.map(article => {
          return <ClothingArticle key={article.title} article={article} clothingClick={clothingClick} placement={placement} />
        })}
      </div>
    </div>
  );
};

export default ClothingPlacement;