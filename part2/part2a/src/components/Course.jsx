import React from 'react'
import Header from './Header'
import Part from './Part'
import Total from './Total'

const Course = ({course}) => {

    const parts = course.parts

    return (
        <>
        <Header name={course.name}/>
        <ul>
            {parts.map(part => 
            <Part key={part.id} name={part.name} exercises={part.exercises}/>
            )}
        </ul>
        <Total parts={parts}/>
        </>
    )
}

export default Course