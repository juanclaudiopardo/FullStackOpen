import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ courses }) => {
  return (
    <>
      {courses.map(({ id, name, parts }) => (
        <div key={id}>
          <Header name={name} />
          {parts &&
            parts.map(({ id, name, exercises }) => (
              <Content key={id} name={name} exercises={exercises} />
            ))}
          <Total parts={parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
