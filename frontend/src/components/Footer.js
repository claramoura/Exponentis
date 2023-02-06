import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Katex from './Katex.js';

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">Copyright &copy; <Katex latex='$ex^{ponentis}$' /></Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;