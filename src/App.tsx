import React, {useState} from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';

//Types
import { QuestionState, Difficulty } from './API';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

// Main application file
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [qNumber, setQNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  // start the quiz
  const startTrivia = async () => {

  }

  // will trigger when the user selects an answer
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  // trigger when user pick for next question
  const nextQuestion = () =>{

  }

  return (
  <div className="App">
     <h1>Cartoon Quiz</h1>
     <button className='start' onClick={startTrivia}>
       Let's Start!
      </button>
      <p className='score'>Score:</p>
      <p>Loading Questions ...</p>
      {/* <QuestionCard 
        questionNum={qNumber + 1}
        totalQuestions = {TOTAL_QUESTIONS}
        question={questions[qNumber].question}
        answers={questions[qNumber].answers}
        userAnswer={ userAnswers ? userAnswers[qNumber] : undefined}
        callback={checkAnswer}
        /> */}
      <button className='nextQ' onClick={nextQuestion}>
        Next Question
      </button>
    
    </div>
  );
}

export default App;

