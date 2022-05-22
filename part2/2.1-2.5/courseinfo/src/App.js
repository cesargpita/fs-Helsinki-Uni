

const Header = ({ name }) => {
  return <>
    <h1>{name}</h1>
  </>
}

const Part = ({ name, exercises }) => <p>
  {name} {exercises}
</p>

const Content = ({ parts }) => <>
  {parts.map((part) => <Part name={part.name} exercises={part.exercises} key={part.id} />)}
</>

const Total = ({ parts }) => <>
  <b>Number of exercises {parts.map(_ => _.exercises).reduce((a, b) => a + b, 0)}</b>
</>

const Course = ({ course }) =>
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App;