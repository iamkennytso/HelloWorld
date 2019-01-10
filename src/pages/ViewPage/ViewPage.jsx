import React from 'react';
import './ViewPage.scss';

import ClothingPlacement from '../../components/ClothingPlacement/ClothingPlacement'

const ViewPage = ({clothes, clothingClick}) => {
  return (
    <div className='ViewPage'>
      {Object.keys(clothes).map(clothingPlacement => {
        return <ClothingPlacement
          placement={clothingPlacement}
          clothes={clothes[clothingPlacement]}
          key={clothingPlacement}
          clothingClick={clothingClick}
        />
      })}
    </div>
  );
};

export default ViewPage;