import React, { useState, useEffect } from 'react'
import Display from './Display'
import Search from './Search'
import contactsService from './Services/Contacts.js'

const App = () => {
  const [ contacts, setContacts ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newSearch, setNewSearch] = useState('')

  useEffect(() => {
    contactsService.getAll().then(initialContacts => setContacts(initialContacts))
  }, [])
  

  const addContact = (event) => {
    event.preventDefault();

    if(contacts.some(contact => contact.name === newName)){
      const confirm = window.confirm(`${newName} is already added to the phonebook, do you want to replace the old number with a new one?`)
      
      if(confirm){
        contactsService.update(contacts, newPhone, newName)
        .then(updatedContact => setContacts(contacts.map(contact => contact.name !== newName ? contact: updatedContact)))
      }
    }
    else{
      const newContact = {
        name: newName,
        number: newPhone,
        id: contacts.length + 1
      }

      contactsService.create(newContact).then(returnedContacts => {
        setContacts(contacts.concat(returnedContacts))
        setNewName('');
        setNewPhone('');
      })
    }
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }  

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }  

  const handleDelete = (contacts, nameToBeDeleted) => {
    const confirm = window.confirm(`Are you sure that you want to delete ${nameToBeDeleted}?`)
    if(confirm){
      contactsService.remove(contacts, nameToBeDeleted)
      setContacts(contacts.filter(contact => contact.name !== nameToBeDeleted))
    }
  }

  
  const contactsToShow = newSearch === '' ? contacts : Search(contacts, newSearch)

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
      <Display contacts = {contactsToShow} handleDelete = {handleDelete} /> 
    </div>
  )
}

export default App