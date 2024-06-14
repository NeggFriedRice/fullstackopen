const ShowCountries = ({ filtered }) => {

    if (filtered.length === 1) {

        // console.log(filtered[0].flags.png)

        const country = filtered[0]
        const languages = Object.entries(country.languages)
        const flag = country.flags.png
        return (
            <>
                <p>{country.capital}</p>
                <p>{country.area}</p>
                <p>Languages</p>
                <ul>
                    {languages.map(language => {return <li key={language[0]}>{language[1]}</li>})}
                </ul>
                <img src={flag}/>
            </>
        )
    }

    return (
        <>
        {
        filtered.length > 10
        ? <p>Too many matches, make your filter more specific</p>
        : filtered.map((country) => {return <li key={country.name.common}>{country.name.common}</li>})
        }
        </>
    )
}

export default ShowCountries