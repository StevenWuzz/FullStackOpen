import Data from "./CountryData"
import Show from "./Show"

const Display = ({filteredCountries}) => {

    if(filteredCountries.length === 1){
        const country = filteredCountries[0]
        return(
            <Data country = {country} />
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
                    <li key = {country.name} style={{listStyleType: "none"}}> {country.name} <Show country = {country} /> </li> 
                </div>
            )
        })
    )
    
}
export default Display