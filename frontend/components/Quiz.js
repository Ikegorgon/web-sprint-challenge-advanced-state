import React from 'react';
import { connect } from 'react-redux';
import { selectAnswer, setQuiz, fetchQuiz, postAnswer } from '../state/action-creators';

const Quiz = (props) => {
  if (props.quiz === null) {
    props.fetchQuiz();
  }
  
  const handleAns1 = () => {
    props.selectAnswer(props.quiz.answers[0]);
  }

  const handleAns2 = () => {
    props.selectAnswer(props.quiz.answers[1]);
  }

  const handleSubmit = () => {
    let answer = {quiz_id: props.quiz.quiz_id, answer_id: props.selectedAnswer.answer_id}
    props.postAnswer(answer);
  }
  const testSelected = () => {
    if (props.selectedAnswer.answer_id === props.quiz.answers[0].answer_id || 
        props.selectedAnswer.answer_id === props.quiz.answers[1].answer_id) {
          return true;
    } else {
      return false;
    }
  }
  return (
    <div id="wrapper">
      {
        props.quiz !== null ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={props.selectedAnswer.answer_id === props.quiz.answers[0].answer_id ? "answer selected" : "answer"}>
                {props.quiz.answers[0].text}
                <button onClick={handleAns1}>
                  {props.selectedAnswer.answer_id === props.quiz.answers[0].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={props.selectedAnswer.answer_id === props.quiz.answers[1].answer_id ? "answer selected" : "answer"}>
                {props.quiz.answers[1].text}
                <button onClick={handleAns2}>
                  {props.selectedAnswer.answer_id === props.quiz.answers[1].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            {testSelected() ? <button id="submitAnswerBtn" onClick={handleSubmit}>Submit answer</button> 
                                  : <button id="submitAnswerBtn" onClick={handleSubmit} disabled>Submit answer</button>}
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedAnswer: state.selectedAnswer,
    quiz: state.quiz
  }
}

export default connect(mapStateToProps, { selectAnswer, setQuiz, fetchQuiz, postAnswer })(Quiz);