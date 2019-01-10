import React from 'react';
import './ViewOptions.scss';

const ViewOptions = ({options, handleViewOptionChange, clearViewOptions}) => {
  return (
    <div className='ViewOptions'>
      I want to see:
      {Object.keys(options).map(option => {
        console.log(option)
        console.log(options[option])
        return <div key={option}>
          {option}: <input type='text' name='name' value={options[option]} onChange={handleViewOptionChange(option)} />
        </div>
      })}
      <button onClick={clearViewOptions}>Clear</button>
    </div>
  );
};

export default ViewOptions;