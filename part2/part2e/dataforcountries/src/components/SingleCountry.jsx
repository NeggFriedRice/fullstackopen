const SingleCountry = ({ country }) => {

    const languages = Object.entries(country.languages)
    // console.log(languages)

    console.log(country)
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>{country.capital[0]}</p>
            <p>{country.area}</p>
            <h3>Languages:</h3>
            <ul>
                {languages.map((language, index) => <li key={index}>{language[1]}</li>)}
            </ul>
            <img src={country.flags.png}></img>
        </div>
    )
}

export default SingleCountry