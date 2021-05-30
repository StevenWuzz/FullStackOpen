let Search = (countries, substring) => {
    let filteredCountries = countries.filter(country => country.name.includes(substring) === true)
    return filteredCountries
}
export default Search