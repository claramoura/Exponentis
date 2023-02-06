import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import AddModelLayout from './AddModelLayout.js';
import { handleInput, handleSave, handleDelete } from '../../utils.js';

function AddLesson() {

  const model = {
    id: '',
    title: '',
    keyConcept: '',
    pairs: '[]',
    renderingOrder: 0,
  }

  const dispatch = useDispatch();

  return (
    <>
    <AddModelLayout
      handleDelete={() => handleDelete(dispatch, 'lesson', model)} 
      handleSave={
        () => handleSave(
          'addModel',
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
          onInput={(e) => handleInput(e.target.value, model, 'id')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type='text' 
          onInput={(e) => handleInput(e.target.value, model, 'title')} 
        />
      </Form.Group> 
      <Form.Group className='mb-3'>
        <Form.Label>KeyConcept</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          onInput={(e) => handleInput(e.target.value, model, 'keyConcept')}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Pairs</Form.Label>
        <Form.Control 
          as='textarea' 
          type='text' 
          onInput={(e) => handleInput(e.target.value, model, 'pairs')} 
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>RenderingOrder</Form.Label>
        <Form.Control 
        type='number' 
        onInput={(e) => handleInput(e.target.value, model, 'renderingOrder')} 
      />
      </Form.Group>
    </AddModelLayout>
    </>
  );

}

export default AddLesson;