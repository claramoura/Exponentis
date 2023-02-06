import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CustomContainer from '../../components/CustomContainer.js';
import Loader from '../../components/Loader.js';

function AddModelLayout(props) {

  const saving = useSelector(state => state.addModelReducer);

  return (
    <>
    <CustomContainer xs={12} md={6}>
      <Form>
        { props.children }
        <Button 
          variant='primary' 
          style={{ float: 'right' }}
          onClick={props.handleSave}
        >
          {saving.loading ? saving.loading && 
            <Loader />
          :
            <span>Save</span>
          }
        </Button>
      </Form>
    </CustomContainer>
    </>
  );
}

export default AddModelLayout;