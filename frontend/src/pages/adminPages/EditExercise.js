import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import EditModelLayout from './EditModelLayout.js';
import { handleInput, stringifyValues, handleSave, handleDelete } from '../../utils.js';

function EditExercise() {

  const model = stringifyValues(window.history.state);
  
  const dispatch = useDispatch();

  return (
    <>
    <EditModelLayout
      handleDelete={() => handleDelete(dispatch, 'exercise', model)}
      handleSave={
        () => handleSave(
          'editModel',
          dispatch, 
          'exercise', 
          model, 
          ['choices']
        )
      }
    >
      <Form.Group className='mb-3'>
        <Form.Label>Id</Form.Label>
        <Form.Control 
          type='text' 
          defaultValue={model ? model.id : ''}
          onInput={(e) => handleInput(e.target.value, model, 'id')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>ResponseType</Form.Label>
        <Form.Control 
          type='text' 
          defaultValue={model ? model.responseType : ''}
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
          type='text' defaultValue={model ? model.prompt : ''}
          onInput={(e) => handleInput(e.target.value, model, 'prompt')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Choices</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.choices : ''}
          onInput={(e) => handleInput(e.target.value, model, 'choices')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Answer</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.answer : ''}
          onInput={(e) => handleInput(e.target.value, model, 'answer')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>ExampleId</Form.Label>
        {model.exampleIdOptions ? true &&
          <Form.Select
            defaultValue={model ? model.exampleId : ''}
            onInput={(e) => handleInput(e.target.value, model, 'exampleId')}
          >
            {model.exampleIdOptions.map((op, index) => 
              <option key={index}>{op}</option>
            )}
          </Form.Select>
        :
          <Form.Control 
            type='text'
            onInput={(e) => handleInput(e.target.value, model, 'exampleId')} 
          />
        }  
      </Form.Group>
    </EditModelLayout>
    </>
  );
}

export default EditExercise;