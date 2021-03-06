import Score from "./components/Score";
import Question from "./components/Question";
import getData from "./functions/getDataFunc.js";
import getNextData from "./functions/getNextDataFunc.js";
import getCategories from "./functions/getCategories.js";
import getDataNextTen from './functions/getDataTenFunc'
import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import SelectCat from "./components/SelectCat";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [jeoperdy, setJeoperdy] = useState({
    category: { title: "" },
    value: 0,
  });
  const [tenQuestions,setTenQueestions] = useState([])
  const [score, setScore] = useState(0);
  const [didAnswer, setDidAnswer] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ title: "", id: 12934 });
  useEffect(() => {
    getData(setQuestion, setAnswer, setJeoperdy, setCategory);
  }, []);
  useEffect(() => {
    getCategories(setCategories, jeoperdy.category_id);
  }, [jeoperdy]);
  const getNextData2 = () => {
    getNextData(setQuestion, setAnswer, setJeoperdy, category);
    getCategories(setCategories, jeoperdy.category_id);
    // dispatchHideQuestion({type:"next question",payload:true})
  };
  const getNextTenData= ()=>{
    getDataNextTen(setTenQueestions)
  }
  return (
    <div className="App">
      <h1 className="App-Title white">Welcome to Jeoperdy</h1>
      <Score
        setScore={setScore}
        setDidAnswer={setDidAnswer}
        jeoperdy={jeoperdy}
        didAnswer={didAnswer}
        setScore={setScore}
        score={score}
      />
      <h1 className="App-lets-play orange">Let's Play</h1>
      <Question
        setCategories={setCategories}
        category={category}
        didAnswer={didAnswer}
        setDidAnswer={setDidAnswer}
        jeoperdy={jeoperdy}
        
        answer={answer}
        question={question}
        getData={getData}
        setAnswer={setAnswer}
        setQuestion={setQuestion}
        setJeoperdy={setJeoperdy}
        setCategory={setCategory}
      />
      <SelectCat
        categories={categories}
        setCategory={setCategory}
        getNextData={getNextData2}
      />
      <button onClick={getNextTenData}>get 10 Questions</button>
      {tenQuestions.map((question,index)=> <Question key={index}
        setCategories={setCategories}
        category={question.category}
        didAnswer={didAnswer}
        setDidAnswer={setDidAnswer}
        jeoperdy={question}
        
        answer={question.answer}
        question={question.question}
        getData={getData}
        setAnswer={setAnswer}
        setQuestion={setQuestion}
        setJeoperdy={setJeoperdy}
        setCategory={setCategory}
      />)}
    </div>
  );
}

export default App;
