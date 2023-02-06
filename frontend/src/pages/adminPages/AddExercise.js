import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import AddModelLayout from './AddModelLayout.js';
import { handleInput, handleSave } from '../../utils.js';

function AddExercise() {

  const model = {
    id: '',
    responseType: '',
    prompt: '',
    choices: '[]',
    answer: '',
    exampleId: '',
  };

  const dispatch = useDispatch();

  return (
    <>
    <AddModelLayout
      handleSave={
        () => handleSave(
          'addModel', 
          dispatch, 
          'exercise', 
          model,
          ['choices'],
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
        <Form.Label>ResponseType</Form.Label>
        <Form.Control 
          type='text'
          onInput={(e) => handleInput(e.target.value, model, 'responseType')} 
        />
        <Form.Text>
          'MC' for multiple choice, 'SA' for short answer
        </Form.Text>
      </Form.Group> 
      <Form.Group className='mb-3'>
        <Form.Label>Prompt</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text'
          onInput={(e) => handleInput(e.target.value, model, 'prompt')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Choices</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text'
          onInput={(e) => handleInput(e.target.value, model, 'choices')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Answer</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text'
          onInput={(e) => handleInput(e.target.value, model, 'answer')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>ExampleId</Form.Label>
        <Form.Control 
          type='text'
          onInput={(e) => handleInput(e.target.value, model, 'exampleId')} 
        />
      </Form.Group>
    </AddModelLayout>
    </>
  );
}

export default AddExercise;