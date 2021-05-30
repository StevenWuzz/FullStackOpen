const flagStyle = {
    width : "180px"
}

const Display = ({filteredCountries}) => {
    if(filteredCountries.length === 1){
        const country = filteredCountries[0]
        return(
            <div>
            <h2> {country.name} </h2>
            <div>
                <p> Capital: {country.capital} </p>
                <p> Population: {country.population} </p>
            </div>
            <h2> Languages </h2>
            <div>
                <ul>
                    {country.languages.map(language => <li key = {language.name}> {language.name} </li>)}
                </ul>
            </div>
            <img src = {country.flag} alt = "Flag" style = {flagStyle}></img>
            </div>
        )
    }


    if(filteredCountries.length > 10){
        return(
            <p> Too many matches, specify another filter </p>
        )
    }

    return (
        filteredCountries.map(country => <li key = {country.name}> {country.name} </li>)
    )
}
export default Display