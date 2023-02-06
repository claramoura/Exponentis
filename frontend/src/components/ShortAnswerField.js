import { addStyles, EditableMathField } from 'react-mathquill';
import '../stylesheets/ShortAnswerField.css';

// inserts the required css to the <head> block.
// you can skip this, if you want to do that by yourself.
addStyles()

function ShortAnswerField(props) {
  return (
    <>
    <EditableMathField
      latex={props.latex}
      onChange={props.onChange}
    />
    </>
  );
}

export default ShortAnswerField;