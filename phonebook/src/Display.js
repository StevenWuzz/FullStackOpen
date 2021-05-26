const Display = ({contacts}) => {
    return (
        contacts.map(contact => <li key = {contact.name}> {contact.name} {contact.phone} </li>)
    )
}
export default Display