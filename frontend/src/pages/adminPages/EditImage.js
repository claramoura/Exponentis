import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import EditModelLayout from './EditModelLayout.js';
import { handleInput, handleSave, handleDelete } from '../../utils.js';

function EditImage() {

  const model = window.history.state;
  
  const dispatch = useDispatch();

  const handleFileUpload = (e, model) => {
    const file = e.target.files[0];
    model['file'] = file;
  }

  return (
    <>
    <EditModelLayout
      handleDelete={() => handleDelete(dispatch, 'image', model)}
      handleSave={
        () => handleSave(
          'editModel',
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
          defaultValue={model ? model.id : ''}
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

export default EditImage;