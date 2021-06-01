import {useState} from 'react'
import Data from "./CountryData"

const Show = ({country}) => {
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(!show)

    if(show === false){
        return(
            <button onClick = {handleShow}> Show </button>
        )
    }
    else{
        return(
            <div>
                <button onClick = {handleShow}> Hide </button>
                <Data country = {country} />
            </div>
        )
    }
}

export default Show