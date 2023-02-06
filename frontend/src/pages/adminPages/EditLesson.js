import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import EditModelLayout from './EditModelLayout.js';
import { handleInput, stringifyValues, handleSave, handleDelete } from '../../utils.js';

function EditLesson() {
  
  const model = stringifyValues(window.history.state);
  const dispatch = useDispatch();

  return (
    <>
    <EditModelLayout
      handleDelete={() => handleDelete(dispatch, 'lesson', model)} 
      handleSave={
        () => handleSave(
          'editModel',
          dispatch, 
          'lesson', 
          model, 
          ['pairs']
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
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type='text' 
          defaultValue={model ? model.title : ''}
          onInput={(e) => handleInput(e.target.value, model, 'title')} 
        />
      </Form.Group> 
      <Form.Group className='mb-3'>
        <Form.Label>KeyConcept</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.keyConcept : ''}
          onInput={(e) => handleInput(e.target.value, model, 'keyConcept')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Pairs</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          defaultValue={model ? model.pairs : ''}
          onInput={(e) => handleInput(e.target.value, model, 'pairs')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>RenderingOrder</Form.Label>
        <Form.Control 
        type='number' 
        defaultValue={model ? model.renderingOrder : ''}
        onInput={(e) => handleInput(e.target.value, model, 'renderingOrder')} 
      />
      </Form.Group>
    </EditModelLayout>
    </>
  );
}

export default EditLesson;