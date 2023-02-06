import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import EditModelLayout from './EditModelLayout.js';
import { handleInput, stringifyValues, handleSave, handleDelete } from '../../utils.js';

function EditGraph() {

  const model = stringifyValues(window.history.state);
  const dispatch = useDispatch();

  return (
    <>
    <EditModelLayout
      handleDelete={() => handleDelete(dispatch, 'graph', model)}
      handleSave={
        () => handleSave(
          'editModel',
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
          defaultValue={model ? model.id : ''}
          onInput={(e) => handleInput(e.target.value, model, 'id')} 
        />
      </Form.Group> 
      <Form.Group className='mb-3'>
        <Form.Label>Settings</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.settings : '{}'}
          onInput={(e) => handleInput(e.target.value, model, 'settings')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Expression</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.expression : '{}'}
          onInput={(e) => handleInput(e.target.value, model, 'expression')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>MathBounds</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.mathBounds : '{}'}
          onInput={(e) => handleInput(e.target.value, model, 'mathBounds')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Points</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.points : '[]'}
          onInput={(e) => handleInput(e.target.value, model, 'points')} 
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

export default EditGraph;