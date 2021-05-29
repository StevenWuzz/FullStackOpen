const Display = ({contacts}) => {
    return (
        contacts.map(contact => <li key = {contact.name}> {contact.name} {contact.number} </li>)
    )
}
export default Display