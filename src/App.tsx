import React, {useState} from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';

//Types
import { QuestionState, Difficulty } from './API';

//Styles
import { GlobalStyle, Wrapper  } from './App.styles';

export type AnswerObject = {
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

  

  // start the quiz
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS, Difficulty.MEDIUM
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQNumber(0);
    setLoading(false);

  }

  // will trigger when the user selects an answer
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      //users answer
      const answer = e.currentTarget.value;
      //check users answer against the correct answer
      const correct = questions[qNumber].correct_answer === answer;
      //add score if correct
      if(correct) setScore(prev => prev + 1);
      //Save answer in the array for user answers
      const answerObject = {
        question: questions[qNumber].question,
        // when the key and value is the same 
        answer,
        correct,
        correctAnswer: questions[qNumber].correct_answer,


      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  // trigger when user pick for next question
  const nextQuestion = () =>{
    //move to next Q if not last Q
    const nextQuestion = qNumber + 1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true);
    } else {
      setQNumber(nextQuestion);
    }
  }

  return (
    <> 
    <GlobalStyle />
    <Wrapper>
      <h1>Cartoon Quiz</h1>
      {/* TODO: find a way to let user choose category and difficulty */}
      {/* <h3>Select A Category</h3>
      <label>Choose Difficulty:</label>
      <select id='difficulty'>
        <option value='difficulty.EASY'>Easy</option>
        <option value='difficulty.MEDIUM'>Medium</option>
        <option value='difficulty.HARD'>Hard</option>
      </select> */}
      {/* hide start button when user presses start or hits the last Q */}
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className='start' onClick={startTrivia}>
        Let's Start!
        </button>) : null}

        {!gameOver ? <p className='score'>Score: {score} </p> : null }

        {loading && <p>Loading Questions ...</p>}

        { !loading && !gameOver && (
          <QuestionCard 
            questionNum={qNumber + 1}
            totalQuestions = {TOTAL_QUESTIONS}
            question={questions[qNumber].question}
            answers={questions[qNumber].answers}
            userAnswer={ userAnswers ? userAnswers[qNumber] : undefined}
            callback={checkAnswer}
            /> 
        )}

        {!gameOver && !loading && userAnswers.length === qNumber + 1 && qNumber !== TOTAL_QUESTIONS - 1 ? (
          <button className='nextQ' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}

        {userAnswers.length===TOTAL_QUESTIONS ? 
          <p className='end-score'>You got {score} out of  {TOTAL_QUESTIONS} right</p> : null
        }
      </Wrapper>
    </>
  );
}

export default App;

