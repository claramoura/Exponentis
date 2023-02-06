import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import AddModelLayout from './AddModelLayout.js';
import { handleInput, handleSave } from '../../utils.js';

function AddGraph() {

  const model = {
    id: '',
    settings: '{}',
    expression: '',
    mathBounds: '{}',
    points: '[]',
    lessonId: '',
  };

  const dispatch = useDispatch();

  return (
    <>
    <AddModelLayout
      handleSave={
        () => handleSave(
          'addModel',
          dispatch,
          'graph', 
          model, 
          ['settings', 'expression', 'mathBounds', 'points'],
        )
      }
    >
      <Form.Group className='mb-3'>
        <Form.Label>Id</Form.Label>
        <Form.Control
          type='text' 
          onInput={(e) => handleInput(e.target.value, model, 'id')} 
        />
      </Form.Group> 
      <Form.Group className='mb-3'>
        <Form.Label>Settings</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text'
          onInput={(e) => handleInput(e.target.value, model, 'settings')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Expression</Form.Label>
        <Form.Control
          as='textarea' 
          type='text'
          onInput={(e) => handleInput(e.target.value, model, 'expression')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>MathBounds</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text'
          onInput={(e) => handleInput(e.target.value, model, 'mathBounds')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Points</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text'
          onInput={(e) => handleInput(e.target.value, model, 'points')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Lesson Id</Form.Label>
        <Form.Control 
          type='text'
          onInput={(e) => handleInput(e.target.value, model, 'lessonId')}
        />
      </Form.Group>
    </AddModelLayout>
    </>
  );
}

export default AddGraph;