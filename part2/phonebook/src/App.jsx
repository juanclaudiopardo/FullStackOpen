import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (existingPerson.number !== number) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const updatedPerson = { ...existingPerson, number: number };

          personService
            .updatePerson(existingPerson.id, updatedPerson)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== existingPerson.id ? person : returnedPerson
                )
              );
              setNewName('');
              setNumber('');
              showNotification(
                `Updated ${returnedPerson.name}'s number`,
                'success'
              );
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                showNotification(
                  `Information of ${newName} has already been removed from server`,
                  'error'
                );
                setPersons(persons.filter((p) => p.id !== existingPerson.id));
              } else {
                showNotification(
                  `Error updating ${newName}'s information`,
                  'error'
                );
              }
              console.log('Error updating person:', error);
            });
        }
      } else {
        showNotification(
          `${newName} is already added to the phonebook with the same number`,
          'info'
        );
      }
    } else {
      const newPerson = { name: newName, number };

      personService
        .createPerson(newPerson)
        .then((person) => {
          setPersons([...persons, person]);
          setNewName('');
          setNumber('');
          showNotification(`Added ${person.name}`, 'success');
        })
        .catch((error) => {
          showNotification(
            'Failed to add the new person. Please try again.',
            'error'
          );
          console.log('Error adding new person:', error);
        });
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting person:', error);
          alert('Failed to delete the person. Please try again.');
        });
    }
  };

  useEffect(() => {
    personService
      .getAllPersons()
      .then((persons) => setPersons(persons))
      .catch((error) => console.log('error catching all persosn', error));
  }, []);

  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter onChange={handleFilterChange} value={filter} />

      <h2>Add new</h2>
      <PersonForm
        onSubmit={handleSubmit}
        onChangeName={handleNameChange}
        valueNewName={newName}
        onChangeNumber={handleNumberChange}
        valueNumber={number}
      />
      <h2>Numbers</h2>
      {filteredPersons.map((item, index) => (
        <div key={`${item.name}-${index}`} style={{ display: 'flex' }}>
          <p>
            {item.name} {item.number}
          </p>
          <button onClick={() => handleDelete(item.id, item.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
