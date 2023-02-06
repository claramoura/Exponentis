import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import EditModelLayout from './EditModelLayout.js';
import { handleInput, stringifyValues, handleSave, handleDelete } from '../../utils.js';

function EditUser() {

  const model = stringifyValues(window.history.state);
  const dispatch = useDispatch();

  const handleCheckboxInput = (e, modelField) => {
    if (e.target.value === 'on') {
      model[modelField] = true;
    } else {
      model[modelField] = false;
    }
  }
    
  return (
    <>
    <EditModelLayout
      handleDelete={() => handleDelete(dispatch, 'user', model)} 
      handleSave={
        () => handleSave(
          'editModel',
          dispatch, 
          'user', 
          model, 
          ['submissions', 'courseProgress', 'unitProgress']
          )
        }
    >
      <Form.Group className='mb-3'>
        <Form.Label>Id</Form.Label>
        <Form.Control type='text' disabled defaultValue={model ? model.id : ''} />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' disabled defaultValue={model ? model.username : ''} />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type='text' 
          defaultValue={model ? model.email : ''}
          onInput={(e) => handleInput(e.target.value, model, 'email')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>First name</Form.Label>
        <Form.Control 
          type='text' 
          defaultValue={model ? model.first_name : ''}
          onInput={(e) => handleInput(e.target.value, model, 'first_name')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Last name</Form.Label>
        <Form.Control 
          type='text' 
          defaultValue={model ? model.last_name : ''}
          onInput={(e) => handleInput(e.target.value, model, 'last_name')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='text' disabled defaultValue={model ? model.password : ''} />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Submissions</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.submissions : ''}
          onInput={(e) => handleInput(e.target.value, model, 'submissions')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Course progress</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.courseProgress : ''}
          onInput={(e) => handleInput(e.target.value, model, 'courseProgress')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Unit progress</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.unitProgress : ''}
          onInput={(e) => handleInput(e.target.value, model, 'unitProgress')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Date joined</Form.Label>
        <Form.Control type='text' disabled defaultValue={model ? model.date_joined : ''} />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Last login</Form.Label>
        <Form.Control type='text' disabled defaultValue={model ? model.last_login : ''} />
      </Form.Group>
      <Form.Check className='mb-3'>
        <Form.Check.Input 
          type='checkbox' 
          defaultChecked={model ? model.is_active : false}
          onInput={(e) => handleCheckboxInput(e, 'is_active')}  
        />
        <Form.Check.Label>Is active</Form.Check.Label>
      </Form.Check>
      <Form.Check className='mb-3'>
        <Form.Check.Input 
          type='checkbox' 
          defaultChecked={model ? model.is_staff : false}
          onInput={(e) => handleCheckboxInput(e, 'is_staff')}  
        />
        <Form.Check.Label>Is staff</Form.Check.Label>
      </Form.Check>
      <Form.Check className='mb-3'>
        <Form.Check.Input 
          type='checkbox' 
          defaultChecked={model ? model.is_superuser : false}
          onInput={(e) => handleCheckboxInput(e, 'is_superuser')}  
        />
        <Form.Check.Label>Is superuser</Form.Check.Label>
      </Form.Check>
    </EditModelLayout>
    </>
  );
}

export default EditUser;