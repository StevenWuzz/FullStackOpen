import React from 'react'

const Header = ({name}) => {
  return(
    <div>
    <h1> {name} </h1>
    </div>
  )
}


const Content = ({parts}) => {
    return(
        <div>
        <p> {parts.name} {parts.exercises} </p>
        </div>
      )
}


const Total = ({parts}) => {

  let total = 0
  for(let i = 0; i < parts.length; i++){
      total += parts[i].exercises
  }  

  return(
    <div>
    <p> Number of exercises {total} </p>
    </div>
  )
}


const Course = ({course}) => { 
return(
    <div>
    <Header name = {course.name} />
    {course.parts.map(parts =>
        <Content key={parts.id} parts = {parts} />
    )}
    <Total parts = {course.parts} />
    </div>
)
}

export default Course