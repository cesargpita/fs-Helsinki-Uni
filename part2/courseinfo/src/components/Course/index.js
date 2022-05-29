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

export default Course;