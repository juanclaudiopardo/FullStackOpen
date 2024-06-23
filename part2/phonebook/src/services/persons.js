import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAllPersons = () => {
  return axios.get(baseUrl).then((response) => {
    return response.data;
  });
};

const createPerson = (person) => {
  return axios.post(baseUrl, person).then((response) => {
    return response.data;
  });
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => {
    return response.data;
  });
};

const updatePerson = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson).then((response) => {
    return response.data;
  });
};

export default {
  getAllPersons,
  createPerson,
  deletePerson,
  updatePerson,
};
