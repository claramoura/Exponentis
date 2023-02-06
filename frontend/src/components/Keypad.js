import { Container } from 'react-bootstrap';
import KeypadButton from './KeypadButton.js';

function Keypad(props) {

  const keys = [
    { key: '\\left(\\space\\right)', id: 'parentheses', value: '\\left(\\right)' },
    { key: '\\pi', id: 'pi', value: '\\pi ' }, 
    { key: 'a^{2}', id: 'square', value: '^{2}' },
    { key: 'a^{n}', id: 'nth-power', value: '^{}' },
    { key: '\\sqrt{a}', id: 'square-root', value: '\\sqrt{}' },
    { key: '\\dfrac{a}{b}', id: 'fraction', value: '\\dfrac{}{}' },
  ]

  return (
    <>
    <Container>
      {keys.map((k, index) => 
        <KeypadButton
          id={k.id}
          latex={k.key} 
          key={`key${index+1}`} 
          value={k.value}
          title={k.id}
          onClick={(e) => props.onClick(e.currentTarget.value)}
        >
        </KeypadButton>
      )}
    </Container>
    </>
  );
}

export default Keypad;