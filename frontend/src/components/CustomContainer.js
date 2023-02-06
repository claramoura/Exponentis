import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function CustomContainer(props) {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={props.xs} md={props.md}>
            { props.children }
        </Col>
      </Row>
    </Container>
  );
}

export default CustomContainer;