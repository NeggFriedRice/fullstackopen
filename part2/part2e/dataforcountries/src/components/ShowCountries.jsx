import { useState } from 'react'
import SingleCountry from './SingleCountry'

const ShowCountries = ({ filtered, setFiltered }) => {

    // const [countryObj, setCountryObj] = useState({})
    // const [show, setShow] = useState(false)

    // if (filtered.length === 1) {

    //     const country = filtered[0]
    //     const languages = Object.entries(country.languages)
    //     const flag = country.flags.png
    //     return (
    //         <>
    //             <p>{country.capital}</p>
    //             <p>{country.area}</p>
    //             <p>Languages</p>
    //             <ul>
    //                 {languages.map(language => {return <li key={language[0]}>{language[1]}</li>})}
    //             </ul>
    //             <img src={flag}/>
    //         </>
    //     )
    // }

    // const showView = (countryName) => {
    //     const countryObject = filtered.filter((country) => country.name.common === countryName)
    //     setCountryObj(countryObject)
    //     setShow(true)

    // }

    // console.log(countryObj[0].capital)

    // return (
    //     <>
    //     {
    //     filtered.length > 10
    //     ? <p>Too many matches, make your filter more specific</p>
    //     : filtered.map((country) => {return (
    //         <>
    //         <li key={country.name.common}>{country.name.common}<button onClick={() => showView(country.name.common)}>show</button></li>
    //         { show ? (
    //             <p>{countryObj[0].capital}</p>
    //         ) : null}
    //         </>
    //     )})
    //     }
    //     </>
    // )

    if (filtered.length > 10) {
        return (
            <p>Too many matches, make your filter more specific</p>
        )
    } else if (filtered.length <= 10 && filtered.length > 1) {
        return (
            <ul>
                {filtered.map((country, index) => <li key={index}>{country.name.common}<button onClick={() => setFiltered([country])}>show</button></li>)}
            </ul>
        )
    } else if (filtered.length === 1) {
        console.log(filtered[0])
        return (
            <SingleCountry country={filtered[0]}/>
        )
    }
}

export default ShowCountries