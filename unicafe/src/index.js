import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick,text}) => (
  <button onClick = {onClick}>
  {text}
  </button>
)

const Header = ({header}) => {
  return(
    <div>
    <h1> {header} </h1>
    </div>
  )
}

const Display = ({type, stats}) => {
  return(
    <div>
    <p> {type} {stats} </p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  const calcTotal = () => good + neutral + bad
  const calcAverage = () => (good - bad) / calcTotal()
  const calcPositive = () => good / calcTotal()

  return (
    <div>
    <Header header = {'Give Feedback'} />
    <Button onClick = {handleGood} text = 'Good' />
    <Button onClick = {handleNeutral} text = 'Neutral' />
    <Button onClick = {handleBad} text = 'Bad' />
    <Header header = {'Statistics'} />
    <Display type = {'Good'} stats = {good} />
    <Display type = {'Neutral'} stats = {neutral} />
    <Display type = {'Bad'} stats = {bad} />
    <Display type = {'All'} stats = {calcTotal()} />
    <Display type = {'Average'} stats = {calcAverage()} />
    <Display type = {'Positive'} stats = {calcPositive()} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)