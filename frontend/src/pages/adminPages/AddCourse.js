import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import AddModelLayout from './AddModelLayout.js';
import { handleInput, handleSave, handleDelete } from '../../utils.js';

function AddCourse() {

  const model = {
    id: '',
    course: '',
    units: '[]',
  }

  const dispatch = useDispatch();

  return (
    <>
    <AddModelLayout
      handleDelete={() => handleDelete(dispatch, 'course', model)}
      handleSave={
        () => handleSave(
          'addModel', 
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
          onInput={(e) => handleInput(e.target.value, model, 'id')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Course</Form.Label>
        <Form.Control 
          type='text' 
          onInput={(e) => handleInput(e.target.value, model, 'course')}
        />
      </Form.Group> 
      <Form.Group className='mb-3'>
        <Form.Label>Units</Form.Label>
        <Form.Control 
          as='textarea'
          type='text' 
          onInput={(e) => handleInput(e.target.value, model, 'units')}
        />
      </Form.Group>
    </AddModelLayout>
    </>
  );

}

export default AddCourse;