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

const Statistics = ({text, good, neutral, bad}) => {

  const type_arr = ["Good", "Neutral", "Bad", "All", "Average", "Positive"]
  const val_arr = [good, neutral, bad, good + neutral + bad,(good - bad) / (good + neutral + bad), good / (good + neutral + bad)]

  var match = 0
  for(let i = 0; i <= 5; i++){
    if(text === type_arr[i]) match = i
  }

  if(good > 0 || bad > 0 || neutral > 0) {
    return(
      <div>
      <Display type = {type_arr[match]} stats = {val_arr[match]} />
      </div>
    )
  }
  else if(text === "Good" && good === 0)
  return(
    <div>
    <p> No Feedbacks Given</p>
    </div>
  )

  return(
    <div></div>
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

  return (
    <div>
    <Header header = {'Give Feedback'} />
    <Button onClick = {handleGood} text = 'Good' />
    <Button onClick = {handleNeutral} text = 'Neutral' />
    <Button onClick = {handleBad} text = 'Bad' />
    <Header header = {'Statistics'} />
    <Statistics text = {"Good"} good = {good} neutral = {neutral} bad = {bad} />
    <Statistics text = {"Neutral"} good = {good} neutral = {neutral} bad = {bad} />
    <Statistics text = {"Bad"} good = {good} neutral = {neutral} bad = {bad} />
    <Statistics text = {"All"} good = {good} neutral = {neutral} bad = {bad} />
    <Statistics text = {"Average"} good = {good} neutral = {neutral} bad = {bad} />
    <Statistics text = {"Positive"} good = {good} neutral = {neutral} bad = {bad} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)