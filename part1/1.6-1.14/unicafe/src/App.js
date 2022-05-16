import { useState } from 'react'

const Button = ({ text, clickHandler }) => <button onClick={clickHandler}>{text}</button>

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
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad) / (good + neutral + bad)}</p>
      <p>positive {good / (good + neutral + bad) * 100}%</p>
    </div>
  )
}

export default App