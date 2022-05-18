import { useState } from 'react'

const Button = ({ text, clickHandler }) => <button onClick={clickHandler}>{text}</button>

const StatisticLine = ({ text, value }) =>
  <tr>
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
  </tr>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  return <> {total ? <>
    <h2>statistics</h2>
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={(good - bad) / total} />
        <StatisticLine text="positive" value={good / total * 100 + '%'} />
      </tbody>
    </table>
  </> : <p>No feedback given</p>}
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