import React from 'react';

const Icon = ({ icon, size, className, ...otherProps }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <path d={icon} />
    </svg>
  );
};

export default Icon;
