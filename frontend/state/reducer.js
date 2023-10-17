// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';
import { MOVE_CLOCKWISE, 
        MOVE_COUNTERCLOCKWISE, 
        SET_SELECTED_ANSWER, 
        SET_INFO_MESSAGE, 
        SET_QUIZ_INTO_STATE, 
        INPUT_CHANGE, 
        RESET_FORM } from './action-types';

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return (state = (state === 5 ? 0 : state + 1));
    case MOVE_COUNTERCLOCKWISE:
      return (state = (state === 0 ? 5 : state - 1));
    default: 
      return state;
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return {
        quiz_id: action.payload.quiz_id, 
        question: action.payload.question, 
        answers: action.payload.answers
      };
    default: 
      return state;
  }
}

const initialSelectedAnswerState = {answer_id: "", text: ""}
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return (action.payload);
    default: 
      return state;
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      if (action.payload.message) {
        return (action.payload.message);
      } else {
        return "Congrats: \"" + action.payload.question + "\" is a great question!";
      }
    default: 
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {...state, [action.payload.field]: action.payload.value};
    case RESET_FORM:
      return {...initialFormState};
    default: 
      return state;
  }
}

const reducer = combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form });
export default reducer;
