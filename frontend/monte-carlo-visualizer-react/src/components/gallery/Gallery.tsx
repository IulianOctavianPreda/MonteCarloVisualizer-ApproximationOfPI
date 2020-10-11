import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Image from 'react-bootstrap/esm/Image';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';

import { GraphProcessor } from '../../shared/web-workers/graph-processor.worker';
import { updateDistribution } from '../../store/actions/update-distribution.action';
import { ApplicationState } from '../../store/reducers/application-state';

const mapStateToProps = (state: ApplicationState) => {
    return {
        distributions: state.distributions
    };
};

const mapDispatch = (dispatch: any) => {
    return {
        updateDistribution: bindActionCreators(updateDistribution, dispatch)
    };
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

const Gallery = (props: Props) => {
    const [graphProcessor] = useState(new GraphProcessor());
    const [ids, setIds] = useState<number[]>(props.distributions.map((x) => x.id));

    useEffect(() => {
        let dist = props.distributions.filter((x) => !ids.includes(x.id));

        if (dist[0])
            graphProcessor.worker.postMessage({
                id: dist[0].id,
                points: dist[0].points,
                size: 400
            });

        graphProcessor.worker.onMessage().subscribe((x) => {
            const data: { id: number; blob: Blob } = x.data;
            let dist = props.distributions.filter((x) => !ids.includes(x.id));
            if (dist[0]) {
                dist[0].metadata.imgUrl = URL.createObjectURL(data.blob);
                props.updateDistribution(dist[0]);
            }

            graphProcessor.worker.terminate();
        });

        // return () => {
        //     graphProcessor.worker.terminate();
        // };
    }, [props.distributions]);

    return (
        <Container>
            <Row>
                {props.distributions.map((x) => {
                    if (!x.metadata.imgUrl) {
                        return (
                            <Col key={x.id} xs={6} md={4}>
                                <Spinner animation="border" role="status" variant="info">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </Col>
                        );
                    } else {
                        return (
                            <Col key={x.id} xs={6} md={4}>
                                <Image src={x.metadata.imgUrl} rounded />
                            </Col>
                        );
                    }
                })}
            </Row>
        </Container>
    );
};

export default connector(Gallery);
