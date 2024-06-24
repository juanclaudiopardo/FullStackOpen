import React from 'react';
const CountryInfo = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area} km²</p>
    <h3>Languages:</h3>
    <ul>
      {Object.values(country.languages).map((lang) => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
    <img
      src={country.flags.png}
      alt={`Flag of ${country.name.common}`}
      style={{ width: '150px' }}
    />
  </div>
);
export default CountryInfo;
