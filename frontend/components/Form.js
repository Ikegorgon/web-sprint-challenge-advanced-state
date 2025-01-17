import React from 'react';
import { connect } from 'react-redux';
import { inputChange, resetForm, postQuiz } from '../state/action-creators';

const Form = (props) => {
  const onChange = evt => {
    const newChange = {field: evt.target.id, value: evt.target.value}
    props.inputChange(newChange);
  }

  const onSubmit = evt => {
    evt.preventDefault();
    const newForm = {question_text: props.form.newQuestion.trim(), 
                      true_answer_text: props.form.newTrueAnswer.trim(), 
                      false_answer_text: props.form.newFalseAnswer.trim()};
    props.postQuiz(newForm);
  }

  const testFilled = () => {
    console.log(props.form.newQuestion.trim().length > 1);
    if (props.form.newQuestion.trim().length > 1 
        && props.form.newTrueAnswer.trim().length > 1
        && props.form.newFalseAnswer.trim().length > 1) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer} />
      {testFilled() ? <button id="submitNewQuizBtn">Submit new quiz</button> : <button id="submitNewQuizBtn" disabled>Submit new quiz</button>}
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps, { inputChange, resetForm, postQuiz })(Form);
