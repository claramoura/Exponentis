import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { handleInput, stringifyValues, handleSave, handleDelete } from '../../utils.js';
import EditModelLayout from './EditModelLayout.js';

function EditCourse() {
  
  const model = stringifyValues(window.history.state);
  
  const dispatch = useDispatch();

  return (
    <>
    <EditModelLayout
      handleDelete={() => handleDelete(dispatch, 'course', model)}
      handleSave={
        () => handleSave(
          'editModel', 
          dispatch, 
          'course', 
          model, 
          ['units'],
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
        <Form.Label>Course</Form.Label>
        <Form.Control 
          type='text' 
          defaultValue={model ? model.course : ''}
          onInput={(e) => handleInput(e.target.value, model, 'course')}
        />
      </Form.Group> 
      <Form.Group className='mb-3'>
        <Form.Label>Units</Form.Label>
        <Form.Control 
          as='textarea'
          type='text' 
          defaultValue={model ? model.units : ''}
          onInput={(e) => handleInput(e.target.value, model, 'units')}
        />
      </Form.Group>
    </EditModelLayout>
    </>
  );
}

export default EditCourse;