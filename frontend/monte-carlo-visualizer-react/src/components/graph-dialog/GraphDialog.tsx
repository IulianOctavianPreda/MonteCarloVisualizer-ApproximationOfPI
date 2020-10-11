import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';

import { Distribution } from '../../models/distribution.model';
import Graph from '../graph/Graph';

type Props = {
    distribution: Distribution;
};

const GraphDialog = (props: Props) => {
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        if (!!ref && !!ref.current) {
            setHeight((ref.current as any).clientHeight);
        }
    });

    return (
        <Modal.Dialog className="h-100">
            <Modal.Body ref={ref}>
                <Container fluid>
                    <Row>
                        <Col>
                            <Graph points={props.distribution.points} size={height} />
                        </Col>
                        <Col>
                            <input
                                type="range"
                                min="0"
                                max={props.distribution.points.length}
                                value={props.distribution.points.length}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal.Dialog>
    );
};

export default GraphDialog;
