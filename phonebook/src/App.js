import React, { useState } from 'react'
import Display from './Display'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addContact = (event) => {
    event.preventDefault();

    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`);
    }
    else{
      setPersons(persons.concat({name: newName}));
      setNewName('');
    }
  }
  
  const handleContactChange = (event) => {
    setNewName(event.target.value);
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addContact}>
        <div>
          Name: <input 
          value = {newName}
          onChange = {handleContactChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <Display persons = {persons} />
      </ul>
    </div>
  )
}

export default App