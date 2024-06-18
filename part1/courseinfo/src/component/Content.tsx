import React from 'react';

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(({ name, exercises }, index) => (
        <Part key={`${name} - ${index}`} name={name} exercises={exercises} />
      ))}
    </div>
  );
};

export default Content;
