import React from 'react';
//styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';
//types
import {AnswerObject} from '../App';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNum: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNum, totalQuestions}) => (
<Wrapper>
    <p className='number'>
        Question: {questionNum}/{totalQuestions}
    </p>

    {/* The question */}
    <p dangerouslySetInnerHTML={{__html:question}} />

    {/* the answers */}
    <div>
        {answers.map(answer => (
            <ButtonWrapper 
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}>
               {/* disabled needs a boolean value */}
                <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html: answer}} />
                </button>
            </ButtonWrapper>
        ))}
    </div>
</Wrapper>
);

export default QuestionCard;