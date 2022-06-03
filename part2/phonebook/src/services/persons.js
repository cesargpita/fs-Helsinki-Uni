import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl);

const addName = (persons) => axios.post(baseUrl, persons).then(data => data.data);

const deleteName = (id) => axios.delete(`${baseUrl}/${id}`)
const updateName = (id, newVal) => axios.put(`${baseUrl}/${id}`, newVal).then(data => data.data)

const personsService = { getAll, addName, deleteName, updateName }

export default personsService