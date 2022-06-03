import axios from "axios";

const getAll = () => axios.get('http://localhost:3001/persons');

const addName = (persons) => axios.post('http://localhost:3001/persons', persons).then(data => data.data);

export default { getAll, addName }