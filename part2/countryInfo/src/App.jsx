import { useState, useEffect } from 'react';
import countriesServices from './services/countries';
import CountryInfo from './components/CountryInfo';

const App = () => {
  const [countries, setContries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesServices.getCountries().then((countries) => {
      setContries(countries);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginRight: '5px' }}>Find countries</h2>
        <input value={filter} onChange={handleFilterChange} />
      </div>
      {filter && (
        <div>
          {filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : filteredCountries.length === 1 ? (
            <CountryInfo country={filteredCountries[0]} />
          ) : selectedCountry ? (
            <CountryInfo country={selectedCountry} />
          ) : (
            filteredCountries.map((country) => (
              <div key={country.name.common}>
                {country.name.common}
                <button onClick={() => handleShowCountry(country)}>show</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default App;
