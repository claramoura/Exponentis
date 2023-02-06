import { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import ParseContent from './ParseContent.js';

function KeyConcept(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Container className="py-2">
      <Button variant="primary" onClick={handleShow}>
        Key concept
      </Button>
    </Container>

    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.lesson.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ParseContent data={props.lesson.keyConcept} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default KeyConcept;