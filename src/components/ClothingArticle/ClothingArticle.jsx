import React from 'react';
import './ClothingArticle.scss';

const ClothingArticle = ({article, clothingClick, placement}) => {
  return (
    <div 
      className={`ClothingArticle ClothingArticle-${article.title}`}
      onClick={() => clothingClick(article, placement)}
    >
      Name: {article.title} <br/>
      Warmth: {article.warmth} <br/>
      Color: {article.color} <br/>
      Formal: {article.formal} <br/>
    </div>
  );
};

export default ClothingArticle;