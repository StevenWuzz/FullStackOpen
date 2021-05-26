let Search = (contacts, substring) => {
    let filteredContact = contacts.filter(contact => contact.name.includes(substring) === true)
    return filteredContact
}
export default Search