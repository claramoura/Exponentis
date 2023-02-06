import { Button, Modal } from 'react-bootstrap';
import ParseContent from './ParseContent.js';

function ExampleModal(props) {

  return (
    <>
    <Modal
      show={props.open}
      onHide={props.close}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Example</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ParseContent data={props.example.prompt} />
        <hr/>
        <ParseContent data={props.example.solution} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.goToPractice}>Practice</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}


export default ExampleModal;