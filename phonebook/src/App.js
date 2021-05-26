import React, { useState } from 'react'
import Display from './Display'
import Search from './Search'

const App = () => {
  const [ contacts, setContacts ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newSearch, setNewSearch] = useState('')
  const [ showAll, setShowAll ] = useState(true)

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

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
    if(newSearch !== ''){
      setShowAll(false)
    }
    else{
      setShowAll(true)
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }  

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }  

  const contactsToShow = showAll ? contacts : Search(contacts, newSearch)

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <div> 
        Search: <input
        value = {newSearch}
        onChange = {handleSearch}/>
      </div>
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
        <Display contacts = {contactsToShow} /> 
      </ul>
    </div>
  )
}

export default App