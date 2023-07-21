import React from 'react'
import "./Quiz.css"
import { useState } from 'react'
import Start from './Start'
const QuizSummary = ({score, fetchQuestion}) => {
  const [close, setClose] = useState(false)

  const handleClose = () =>{
    setClose(x => !x)
    window.location.reload()
     //fetchQuestion()
     
  }

  return (
    <div>
      <div className={close ?"remove" :"quizsummarycontainer"}>
        <div className="score"><h3>Score: {score}</h3></div>
        <div className="close"><button onClick={handleClose}>restart</button></div>
      </div>
    </div>
  )
}

export default QuizSummary
