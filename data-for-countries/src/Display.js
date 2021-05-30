const Display = ({filteredCountries}) => {
    return (
        filteredCountries.map(country => <li key = {country.name}> {country.name} </li>)
    )
}
export default Display