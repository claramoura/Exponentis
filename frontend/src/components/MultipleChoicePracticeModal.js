import { useState, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Katex from './Katex.js';
import ParseContent from './ParseContent.js';
import { checkAnswerButton, submitPractice } from '../actions.js';

function MultipleChoicePracticeModal(props) {

  const buttonRef = useRef(null);

  const [inputIndex, setInputIndex] = useState(-1);

  const dispatch = useDispatch();

  const button = useSelector(state => state.checkAnswerButtonReducer);
  const user = useSelector(state => state.signInReducer.user);

  const handleCheck = () => {
    // If user hasn't selected an answer, inputIndex === -1.
    if (inputIndex !== -1) {
      if (inputIndex === parseInt(props.practice.answer)) {
        dispatch(checkAnswerButton('correct'));
        buttonRef.current.disabled = true;
        // Checks whether user has already submitted this practice exercise.
        if (user && user.submissions.includes(props.practice.id) === false) {
          dispatch(submitPractice(props.practice.id));
        }     
      } else {
        dispatch(checkAnswerButton('incorrect'));
      }
    }
  };

  const handleExited = () => {
    if (button.feedback !== 'Check') {
      dispatch(checkAnswerButton('reset'));
    }
    setInputIndex(-1);
  }

  return (
    <>
    <Modal
      show={props.open}
      onHide={props.close}
      onExited={handleExited}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Practice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ParseContent data={props.practice.prompt} />
          <hr/>
          <Form>
            {['radio'].map((type) => (
              <div key={`${type}-choice`} className='mb-3'>
              {props.practice.choices.map((choice, index) => {
                return (  
                  <Form.Check
                    key={`${index}`}
                    className='py-2'
                    type={type}
                    name='choice'
                    id={`${index}`}
                    label={<Katex latex={choice} />}
                    onChange={(e) => setInputIndex(parseInt(e.target.id))}
                  />
                );
              })}
              </div>
            ))}
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='info' onClick={props.backToExample}>
          Back to example
        </Button>
        <Button 
          ref={buttonRef}
          variant={button.variant}
          onClick={handleCheck}
        >
          {button.feedback}
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default MultipleChoicePracticeModal;