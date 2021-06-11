/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"
const baseURL = "/api/contacts"

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (newContact) => {
    const request = axios.post(baseURL, newContact)
    return request.then(response => response.data) 
}

const remove = (contacts, nameToBeDeleted) => {
    const contactToBeDeleted = contacts.find(person => person.name === nameToBeDeleted)
    const id = contactToBeDeleted.id
    axios.delete(`${baseURL}/${id}`)
}

const update = (contacts, newPhoneNumber, newName) => {
    const contactToBeUpdated = contacts.find(person => person.name === newName)
    const id = contactToBeUpdated.id
    const updatedContact = {...contactToBeUpdated, number: newPhoneNumber}
    const request = axios.put(`${baseURL}/${id}`, updatedContact)
    return request.then(response => response.data)
}


export default {getAll, create, remove, update}