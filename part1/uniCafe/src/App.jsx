import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const Button = ({handleClick, rating}) => {
  return (
    <button onClick={handleClick}>{rating}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Stats = ({good, neutral, bad}) => {

  if (good == 0 || neutral == 0 || bad == 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={good + neutral + bad}/>
      <StatisticLine text="average" value={good / (good + bad)}/>
      <StatisticLine text="positive" value={good / (good + bad + neutral)}/>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function handleGood() {
    let updatedGood = good + 1
    setGood(updatedGood)
  }

  function handleNeutral() {
    let updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  function handleBad() {
    let updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} rating="good"/>
      <Button handleClick={handleNeutral} rating="neutral"/>
      <Button handleClick={handleBad} rating="bad"/>
      {/* <h3>Statistics</h3>
      <Stats count={good} rating="good"/>
      <Stats count={neutral} rating="neutral"/>
      <Stats count={bad} rating="bad"/>
      <p>All {good + neutral + bad}</p>
      <p>Average {good / (good + bad)}</p>
      <p>Positive {good / (good + neutral + bad)}</p> */}
      <Stats good={good} neutral={neutral} bad={bad}/>

    </>

  )
}

export default App
