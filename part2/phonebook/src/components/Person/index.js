const Person = ({ person, handleDelete }) => {
  const { name, number, id } = person
  return <div>{name} {number} <button onClick={() => window.confirm(`Delete ${name}?`) && handleDelete(id)}>delete</button></div>
}

export default Person