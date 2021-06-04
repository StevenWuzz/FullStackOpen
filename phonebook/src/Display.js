const Display = ({contacts, handleDelete}) => {
    return (
        contacts.map(contact => <li key = {contact.name} style={{listStyleType: "none"}}> {contact.name} {contact.number} {" "}
        <button onClick = {() => handleDelete(contacts, contact.name)}> Delete </button> </li>)
    )
} 
export default Display