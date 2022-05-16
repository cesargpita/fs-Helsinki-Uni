import { useState } from 'react'

const Button = ({ text, clickHandler }) => <button onClick={clickHandler}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  return <>
    <h2>statistics</h2>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {total}</p>
    <p>average {total ? (good - bad) / total : 0}</p>
    <p>positive {total ? good / total * 100 : 0}%</p>
  </>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" clickHandler={() => setGood(good + 1)} />
      <Button text="neutral" clickHandler={() => setNeutral(neutral + 1)} />
      <Button text="bad" clickHandler={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App