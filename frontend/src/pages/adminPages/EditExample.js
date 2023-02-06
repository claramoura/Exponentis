import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import EditModelLayout from './EditModelLayout.js';
import { handleInput, stringifyValues, handleSave, handleDelete } from '../../utils.js';

function EditExample() {

  const model = stringifyValues(window.history.state);
  const dispatch = useDispatch();


  return (
    <>
    <EditModelLayout 
      handleDelete={() => handleDelete(dispatch, 'example', model)}
      handleSave={() => handleSave('editModel', dispatch, 'example', model, [])}
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
        <Form.Label>Prompt</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.prompt : ''}
          onInput={(e) => handleInput(e.target.value, model, 'prompt')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Solution</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.solution : ''}
          onInput={(e) => handleInput(e.target.value, model, 'solution')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>LessonId</Form.Label>
        {model.lessonIdOptions ? true &&
          <Form.Select
            defaultValue={model ? model.lessonId : ''}
            onInput={(e) => handleInput(e.target.value, model, 'lessonId')}
          >
            {model.lessonIdOptions.map((op, index) => 
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
    </EditModelLayout>
    </>
  );
}

export default EditExample;