import { useState, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ParseContent from './ParseContent.js';
import Keypad from './Keypad.js';
import ShortAnswerField from './ShortAnswerField.js';
import { checkAnswerButton, submitPractice } from '../actions.js';

function ShortAnswerPracticeModal(props) {
  const [latex, setLatex] = useState('')
  
  const buttonRef = useRef(null);

  const dispatch = useDispatch();
  
  const button = useSelector(state => state.checkAnswerButtonReducer);
  const user = useSelector(state => state.signInReducer.user);

  const onClick = (value) => {
    if (latex.endsWith('(\\right)')) {
      const i = latex.lastIndexOf('\\r');
      setLatex(latex.slice(0, i) + value + latex.slice(i,));
    } else if (latex.includes('{ }')) {
      // This allows users to enter, for example, the numerator/denominator of a fraction (TeX: \dfrac{}{}) by clicking another button.
      setLatex(latex.replace('{ }', `{${value}}`));
    } else {
      setLatex(latex + value);
    }
  }

  const handleCheck = () => {
    if (latex === props.practice.answer) {
      dispatch(checkAnswerButton('correct'));
      buttonRef.current.disabled = true;
      // Checks whether user has already submitted this practice exercise.
      if (user && user.submissions.includes(props.practice.id) === false) {
        dispatch(submitPractice(props.practice.id));
      }     
    } else {
      dispatch(checkAnswerButton('incorrect'));
    }
  };

  const handleExited = () => {
    dispatch(checkAnswerButton('reset'));
    setLatex('');
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
        <div className='py-2 px-3'>
          <label>Answer</label>
        </div>
        <div className='py-2 px-3'>
          <ShortAnswerField 
            latex={latex} 
            onChange={(mathField) => {
              setLatex(mathField.latex())
            }}
          ></ShortAnswerField>
        </div>
        <Keypad onClick={onClick} />
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

export default ShortAnswerPracticeModal;