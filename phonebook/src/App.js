import React, { useState } from 'react'
import Display from './Display'

const App = () => {
  const [ contacts, setContacts ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const addContact = (event) => {
    event.preventDefault();

    if(contacts.some(contact => contact.name === newName)){
      alert(`${newName} is already added to the phonebook`);
    }
    else{
      setContacts(contacts.concat({name: newName, phone: newPhone}));
      setNewName('');
      setNewPhone('');
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }  

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }  

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add New Contacts</h2>
      <form onSubmit = {addContact}>
        <div>
          Name: <input 
          value = {newName}
          onChange = {handleNameChange}/>
        </div>
        <div>
          Phone: <input 
          value = {newPhone}
          onChange = {handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      <ul>
        <Display contacts = {contacts} /> 
      </ul>
    </div>
  )
}

export default App