import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import AddModelLayout from './AddModelLayout.js';
import { handleInput, handleSave } from '../../utils.js';

function AddImage() {
  
  const model = {
    id: '',
    file: null,
    lessonId: '',
  }

  const dispatch = useDispatch();

  const handleFileUpload = (e, model) => {
    const file = e.target.files[0];
    model['file'] = file;
  }

  return (
    <>
    <AddModelLayout
      handleSave={
        () => handleSave(
          'addModel',
          dispatch,
          'image',
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
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>File</Form.Label>
        <Form.Control 
          type='file'
          name='file'
          onInput={(e) => handleFileUpload(e, model)}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>LessonId</Form.Label>
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

export default AddImage;