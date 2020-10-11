import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';

import { Distribution } from '../../models/distribution.model';
import Graph from '../graph/Graph';

type Props = {
    distribution: Distribution;
    onClose: () => void;
    show: boolean;
};

const GraphDialog = (props: Props) => {
    const [value, setValue] = useState<number>(0);

    return (
        <Modal show={props.show} onHide={() => props.onClose()} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Visualization</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col>
                            <Graph
                                points={props.distribution?.points.slice(
                                    0,
                                    (value * props.distribution.points.length) / 100
                                )}
                                size={400}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col>
                            <input
                                className="w-100"
                                type="range"
                                min="0"
                                max="100"
                                value={value}
                                onChange={(e) => setValue(parseInt(e.target.value, 10))}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default GraphDialog;
