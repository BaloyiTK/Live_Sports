import React from 'react';
import '../index.css'; // Import the CSS file

const BallBouncingLoader = () => {
  return (
    <div className="box">
      <div className="shadow"></div>
      <div className="gravity">
        <div className="ball"></div>
      </div>
    </div>
  );
};

export default BallBouncingLoader;
