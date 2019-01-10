import React from 'react';
import './ClothingPlacement.scss';
import ClothingArticle from '../ClothingArticle/ClothingArticle';

const ClothingPlacement = ({placement, clothes}) => {
  return (
    <div className={`ClothingPlacement ClothingPlacement-${placement}`}>
      {placement} <br />
      <div className='ClothingPlacement-Container'>
        {clothes.map(article => {
          return <ClothingArticle key={article.title} article={article} />
        })}
      </div>
    </div>
  );
};

export default ClothingPlacement;