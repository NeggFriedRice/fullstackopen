import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log("clicked")
  }

  const increaseByOne = () => {
    setCounter(counter + 1)
  }

  const setToZero = () => {
    setCounter(0)
  }

  const decreaseByOne = () => {
    setCounter(counter - 1)
  }

  return (
    <div>
      <Display counter={counter}/>
      <Button onClick={increaseByOne} text={"plus"}/>
      <Button onClick={setToZero} text={"zero"}/>
      <Button onClick={decreaseByOne} text={"minus"}/>
    </div>
  )
}

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

export default App
