const flagStyle = {
    width : "180px"
}

const Show = () => {

    const showData = (event) => {
        event.preventDefault()
    }
    return(
        <form onSubmit = {showData}>
            <button type = "submit"> Show </button>
        </form>
    )
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
        filteredCountries.map(country => {
            return(
                <div>
                    <li key = {country.name} style={{listStyleType: "none"}}> {country.name} <Show /> </li> 
                </div>
            )
        })
    )
}
export default Display