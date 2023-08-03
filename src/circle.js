import React from 'react';

const Circle = ({ radius, color }) => {
  const circleStyle = {
    width: `${radius}px`,
    height: `${radius}px`,
    borderRadius: '50%',
    backgroundColor: color,
  };

  return <div style={circleStyle}></div>;
};

export default Circle;
