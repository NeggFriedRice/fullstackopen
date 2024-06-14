const DisplayData = ({ searchPerson, persons, filtered, deletePerson }) => {

    return (

        <>
            <h1>Numbers</h1>
            <ul>
                {/* {filtered.map((person) => <li key={person.id}>{person.name} {person.number}</li>)} */}

                { searchPerson.length == 0 
                ? persons.map((person) => <li key={person.id}>{person.name} {person.number}<button onClick={() => deletePerson(person.id)}>delete</button></li>)
                : filtered.map((person) => <li key={person.id}>{person.name} {person.number}</li>)}
            </ul>
        </>
    )
}

export default DisplayData