import { Button } from 'react-bootstrap';
import Katex from './Katex.js';
import '../stylesheets/KeypadButton.css';

function KeypadButton(props) {
  return (
    <Button 
      className='keypad-button'
      id={props.id}
      value={props.value}
      title={props.title}
      onClick={props.onClick}
    >
      {<Katex latex={`$${props.latex}$`} />}
    </Button>
  ); 
}

export default KeypadButton;