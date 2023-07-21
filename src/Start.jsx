import React from 'react'
import { useState } from 'react'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'
import "./Quiz.css"
import Quiz from './Quiz'
const Start = ({start, setStart}) => {

    const handleStart =()=>{
        setStart((x)=>!x)
    }
  return (
    <div >
        <div >
          <h2>Quiz App</h2>
        </div>
        {!start && <button onClick={handleStart}>Start Quiz</button>}
        {start && <Quiz/>}
    </div>
  )
}

export default Start
