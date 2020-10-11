import React, { useRef } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';

import { Distribution } from '../../models/distribution.model';
import { addDistribution } from '../../store/actions/add-distribution.action';
import { deleteDistribution } from '../../store/actions/delete-distribution.action';
import { ApplicationState } from '../../store/reducers/application-state';

const mapStateToProps = (state: ApplicationState) => {
    return {};
};

const mapDispatch = () => {
    return {
        addDistribution,
        deleteDistribution
    };
};

const connector = connect(mapStateToProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    distribution: Distribution;
};

const Graph = (props: Props) => {
    const ref = useRef(null);

    return (
        <Modal.Dialog>
            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col>{/* <Graph distribution={props.distribution} /> */}</Col>
                        <Col></Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal.Dialog>
    );
};

export default connector(Graph);
