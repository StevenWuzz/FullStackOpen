const Display = ({persons}) => {
    return (
        persons.map(person => <li key = {person.name}> {person.name} </li>)
    )
}
export default Display