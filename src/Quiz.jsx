import React, { useEffect, useState } from "react";
import "./Quiz.css";
import axios from "axios";
import QuizSummary from "./QuizSummary";
import { useQuery } from "react-query";
import CustomCheckbox from "./CustomCheckbox";
const Quiz = () => {
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [restart, setRestart] = useState("false")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const fetchQuestion = async()=>{
    const {data} = await axios.get("https://opentdb.com/api.php?amount=10&category=27&difficulty=medium");
        return  data
  }

  

//   const getData = async () => {
//     const qst = await fetchQuestion();
//     setQuestions(qst)
   
// }

  const nextQuestion = ()=>{
    if(correctAsnwer === value){
      setScore((x)=> x+1)
    }
    setCurrentQuestionIndex(x => x+1)
    if(currentQuestionIndex > data?.results.length-1 ){
      setCurrentQuestionIndex(0)
      // getData()
    }
  }
  
  
  // useEffect(()=>{
  //   getData()
  // }, [])
  const randomizeArray = (data = [])=>{
      for(let i = data.length -1; i>0; i--){
        let j = Math.floor(Math.random()* (i+1));
        [data[i],data[j]] = [data[j],data[i]]
      }
      return data
  }

  const handleChange = (e) =>{
    setValue(e.target.value)

  }


  const {data,isLoading,isError,error,refetch} = useQuery('quizApp', fetchQuestion);
  console.log("Data", data?.results[currentQuestionIndex]?.question);
  const correctAsnwer = data?.results? data?.results[currentQuestionIndex]?.correct_answer: "";
  const wrongAsnwer = data?.results? data?.results[currentQuestionIndex]?.incorrect_answers || []: [];
  const answers = randomizeArray([correctAsnwer,...wrongAsnwer])
   
   console.log("score", score);
  if(isLoading){
    return <h3>Loading</h3>
  }
  return (
    <div>
      <div className="container">
        <div className="heading">
          <h2>Quiz App</h2>
        </div>
            <div className="question">
            <input type="text" value={data?.results[currentQuestionIndex]?.question}/>
          </div>
          <div className="options">
            <div className="questionnum"><h3>Question: {currentQuestionIndex === 10? "Finished": currentQuestionIndex+1}</h3></div>
          <CustomCheckbox value={value} radioValue={answers[0]} handleChange={handleChange} />
          <CustomCheckbox value={value} radioValue={answers[1]} handleChange={handleChange}/>
          <CustomCheckbox value={value} radioValue={answers[2]} handleChange={handleChange}/>
          <CustomCheckbox value={value} radioValue={answers[3]} handleChange={handleChange}/>
          </div>
          <button onClick={()=>nextQuestion()}>Next</button>
          {currentQuestionIndex === data?.results.length && <QuizSummary  score={score}/> }
      </div>
    </div>
  );
};

export default Quiz;
