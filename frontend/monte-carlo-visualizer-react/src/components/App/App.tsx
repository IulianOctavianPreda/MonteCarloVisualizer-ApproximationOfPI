import './App.scss';

import React from 'react';
import { Col, Container } from 'react-bootstrap';

import ActionInput from '../action-input/ActionInput';

const App = () => {
    return (
        <Container fluid className="h-100 d-flex justify-content-center align-items-center">
            <Col xs={12} md={8}>
                <ActionInput />
            </Col>
        </Container>
    );
};

export default App;
