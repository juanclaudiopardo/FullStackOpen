import React from 'react';
import Part from './Part';

const Content = ({ name, exercises }) => {
  return <Part name={name} exercises={exercises} />;
};

export default Content;
