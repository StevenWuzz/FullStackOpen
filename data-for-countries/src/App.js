import React, {useState, useEffect} from 'react'
import Search from './Search'
import axios from 'axios'
import Display from './Display'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response =>
      setCountries(response.data))
  }, [])

  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value)
  }

  const filteredCountries = searchCountry === '' ? [] : Search(countries, searchCountry)

  return (
    <div>
      <h1> Countries </h1>
      <div>
        Find Countries: <input 
        value = {searchCountry}
        onChange = {handleSearchCountry} />
      </div>
      <div> 
        <ul> 
          <Display filteredCountries = {filteredCountries} />
        </ul>
      </div>
    </div>
  )
}

export default App;
