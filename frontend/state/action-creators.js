import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, INPUT_CHANGE, RESET_FORM } from './action-types';
import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return({type: MOVE_CLOCKWISE});
}

export function moveCounterClockwise() {
  return({type: MOVE_COUNTERCLOCKWISE});
}

export function selectAnswer(answer) {
  return({type: SET_SELECTED_ANSWER, payload: answer});
}

export function setMessage() {
  return({type: SET_INFO_MESSAGE});
}

export function setQuiz() {
  return({type: SET_QUIZ_INTO_STATE});
}

export function inputChange(data) {
  return({type: INPUT_CHANGE, payload: data});
}

export function resetForm() {
  return({type: RESET_FORM});
}

// ❗ Async action creators
export const fetchQuiz = () => dispatch => {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data});
    })
    .catch(err => {
      console.log(err);
    });
}
export const postAnswer = (data) => dispatch => {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post('http://localhost:9000/api/quiz/answer', data)
    .then(res => {
      dispatch({ type: SET_INFO_MESSAGE, payload: res.data});
    })
    .catch(err => {
      console.log(err)
    });
}
export const postQuiz = (data) => dispatch => {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  axios.post('http://localhost:9000/api/quiz/new', data)
    .then(res => {
      dispatch({ type: SET_INFO_MESSAGE, payload: res.data});
      dispatch({ type: RESET_FORM });
    })
    .catch(err => {
      console.log(err)
    });
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
