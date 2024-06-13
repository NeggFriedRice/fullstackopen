const DisplayData = ({ searchPerson, persons, filtered, deletePerson }) => {

    return (

        <>
            <h2>Numbers</h2>
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