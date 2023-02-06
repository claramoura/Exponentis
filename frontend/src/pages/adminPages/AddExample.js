import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import AddModelLayout from './AddModelLayout.js';
import { handleInput, handleSave } from '../../utils.js';

function AddExample() {

  const model = {
    id: '',
    prompt: '',
    solution: '',
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
          'example', 
          model,
          [],
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
        <Form.Label>Prompt</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text'
          onInput={(e) => handleInput(e.target.value, model, 'prompt')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Solution</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text'
          onInput={(e) => handleInput(e.target.value, model, 'solution')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Lesson Id</Form.Label>
        {localStorage.getItem('lessonIdOptions') ? true &&
          <Form.Select
            onInput={(e) => handleInput(e.target.value, model, 'lessonId')}
          >
            {JSON.parse(localStorage.getItem('lessonIdOptions')).map((op, index) => 
              <option key={index}>{op}</option>
            )}
          </Form.Select>
        :
          <Form.Control 
            type='text'
            onInput={(e) => handleInput(e.target.value, model, 'lessonId')}
          />
        }  
      </Form.Group>
    </AddModelLayout>
    </>
  );
}

export default AddExample;