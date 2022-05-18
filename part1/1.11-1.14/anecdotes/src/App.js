import { useState } from 'react'

const MostVoted = ({ anecdotes, points }) => {
  const max = Math.max(...points);
  const maxIndex = points.indexOf(max);
  return <>
    <h2>Anecdote with most votes</h2>
    {anecdotes[maxIndex]}
  </>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const vote = (index) => {
    const copy = [...points];
    copy[index] += 1;
    setPoints(copy);
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      Has {points[selected]} votes
      <br />
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next annecdote</button>
      <button onClick={() => vote(selected)}>vote</button>
      <MostVoted anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App