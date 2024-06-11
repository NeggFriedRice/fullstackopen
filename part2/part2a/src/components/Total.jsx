const Total = ({parts}) => {

    const sum = parts.reduce((prev, part) => {
        return prev + part.exercises
    }, 0)

    console.log(sum)

    return (
        <p>Total number of exercises {sum}</p>
    )
}

export default Total