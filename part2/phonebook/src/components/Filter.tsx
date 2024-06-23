import React from 'react';

const Filter = ({ ...props }) => {
  return (
    <div>
      filter shown with: <input {...props} />
    </div>
  );
};

export default Filter;
