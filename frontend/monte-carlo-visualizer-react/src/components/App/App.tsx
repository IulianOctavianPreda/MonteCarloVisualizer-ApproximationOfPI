import './App.scss';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import ActionInput from '../action-input/ActionInput';
import Gallery from '../gallery/Gallery';

const App = () => {
    return (
        <Container fluid className="h-100 d-flex justify-content-center align-items-center flex-wrap">
            <Row className="w-100 justify-content-center align-items-center">
                <Col xs={12} md={8}>
                    <ActionInput />
                </Col>
            </Row>
            <Row className="w-100 justify-content-center align-items-center">
                <Col xs={12} md={8}>
                    <Gallery />
                </Col>
            </Row>
        </Container>
    );
};

export default App;
