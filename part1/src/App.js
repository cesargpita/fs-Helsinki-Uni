const Header = (props) => {
  return <>
    <h1>{props.course}</h1>
  </>
}

const Part = (props) => <p>
  {props.name} {props.exercises}
</p>

const Content = (props) => <>
  {props.parts.map((part, id) => <Part name={part.name} exercises={part.exercises} key={id} />)}
</>

const Total = (props) => <>
  <p>Number of exercises {props.parts.map(_ => _.exercises).reduce((a, b) => a + b, 0)}</p>
</>

const App = () => {
  const course = 'Half Stack application development'
  const parts = [{
    name: 'Fundamentals of React',
    exercises: 10
  }, {
    name: 'Using props to pass data',
    exercises: 7
  }, {
    name: 'State of a component',
    exercises: 14
  }];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App