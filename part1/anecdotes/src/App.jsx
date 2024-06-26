
import { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const randomise = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const [votes, setVotes] = useState(
    {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
    }
  )

  const [highest, setHighest] = useState(0)

  const handleVote = () => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [selected]: prevVotes[selected] + 1,
    }))
    setHighest(findHighest(votes))
    }

  const Anecdote = ({anecdote}) => <p>{anecdote}</p>
  const NumberVotes = ({numberVotes}) => <p>has {numberVotes} votes</p>
  const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
  
  const findHighest = (votes) => {
    return Object.entries(votes).reduce((highest, [key, value]) => {
      return value > votes[highest] ? key: highest
    }, Object.keys(votes)[0])
  }

  const MostVoted = (index) => {
    return (
      <>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[highest]}</p>
      </>
    )

  }

  return (
    <>
      <Anecdote anecdote={anecdotes[selected]}/>
      <NumberVotes numberVotes={votes[selected]}/>
      <Button onClick={randomise} text="next anecdote"/>
      <Button onClick={handleVote} text="vote"/>
      <MostVoted index={findHighest(votes)}/>
    </>
  )
}

export default App
