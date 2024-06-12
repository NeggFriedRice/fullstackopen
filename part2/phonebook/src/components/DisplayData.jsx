const DisplayData = ({ filtered }) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {filtered.map((person) => <li>{person.name} {person.number}</li>)}
            </ul>
        </>
    )
}

export default DisplayData