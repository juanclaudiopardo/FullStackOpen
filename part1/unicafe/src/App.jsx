import { useState } from 'react';

const StaticLine = ({ text, value }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  );
};
const Statistics = ({ good, neutral, bad, total }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <tr>
          <StaticLine text={'Good'} value={good} />
        </tr>
        <tr>
          <StaticLine text={'Neutral'} value={neutral} />
        </tr>
        <tr>
          <StaticLine text={'Bad'} value={bad} />
        </tr>
        <tr>
          <StaticLine text={'Total'} value={total} />
        </tr>
        <tr>
          <StaticLine text={'Average'} value={(good * 1 + bad * -1) / total} />
        </tr>
        <tr>
          <StaticLine text={'Positive'} value={`${(good / total) * 100} %`} />
        </tr>
      </tbody>
    </table>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const hanldeGoodClick = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  return (
    <div>
      <h1>Give feedBack</h1>
      <div>
        <Button onClick={hanldeGoodClick} text='Good' />
        <Button onClick={handleNeutralClick} text='Neutral' />
        <Button onClick={handleBadClick} text='Bad' />
      </div>
      <h1>Statics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  );
};

export default App;
