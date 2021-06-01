const flagStyle = {
    width : "180px"
}

const Data = ({country}) => {
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

export default Data