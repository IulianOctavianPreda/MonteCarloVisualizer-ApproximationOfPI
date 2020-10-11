import Decimal from 'decimal.js';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import { connect, ConnectedProps } from 'react-redux';

import { Distribution } from '../../models/distribution.model';
import { computePi } from '../../services/helper.service';
import { addDistribution } from '../../store/actions/add-distribution.action';
import { ApiAction } from '../../store/reducers/api-actions.reducer';
import { ApplicationState } from '../../store/reducers/application-state';
import LoopingText from '../looping-text/LoopingText';

const mapStateToProps = (state: ApplicationState) => {
    return {
        apiActions: state.apiActions
    };
};

const mapDispatch = () => {
    return {
        addDistribution
    };
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

const ActionInput = (props: Props) => {
    const [selectedAction, setSelectedAction] = useState<ApiAction>(props.apiActions[0] ?? null);
    const [inputValue, setInputValue] = useState<number>();
    const [showInfo, setShowInfo] = useState<boolean | null>(null);
    const [distribution, setDistribution] = useState<Distribution>();

    useEffect(() => {
        if (distribution?.points && !distribution?.pi) {
            const { pi, elapsedTime } = computePi(distribution.points);

            distribution.pi = pi;
            distribution.metadata.approximationTime = elapsedTime;
            distribution.metadata.waitTime = new Decimal(
                distribution.metadata.approximationTime + distribution.metadata.responseTime
            ).toNumber();

            setDistribution(distribution);
            props.addDistribution(distribution);
        }
    }, [props, distribution]);

    const requestDistribution = async () => {
        setShowInfo(false);

        const startTime = performance.now();
        const dist = await selectedAction.action(inputValue ?? 0);
        dist.metadata.responseTime = performance.now() - startTime;

        setDistribution(dist);

        setShowInfo(true);
    };

    return (
        <Container fluid>
            <Row>
                <InputGroup>
                    <FormControl
                        placeholder="Number of Points"
                        aria-label="Number of Points"
                        aria-describedby="basic-addon2"
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setInputValue(isNaN(value) ? 0 : value);
                        }}
                        onKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) =>
                            e.key === 'Enter' ? await requestDistribution() : null
                        }
                    />

                    <InputGroup.Append>
                        <Button
                            variant="outline-info"
                            onClick={async () => await requestDistribution()}
                            disabled={showInfo === false}
                        >
                            {showInfo === false ? <LoopingText /> : selectedAction.name}
                        </Button>
                    </InputGroup.Append>

                    <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-warning"
                        title=""
                        id="input-group-dropdown-2"
                    >
                        {props.apiActions.map((x) => (
                            <Dropdown.Item key={x.name} className="dropdown-item" onClick={() => setSelectedAction(x)}>
                                {x.name}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </InputGroup>
            </Row>
            <Row className={`justify-content-center align-items-center ${!!showInfo ? 'visible' : 'invisible'}`}>
                <Col className="px-0 my-1">
                    <Alert variant="info">
                        <Row className="pb-4">
                            <Col sm={12} md={12} className="d-flex justify-content-center">
                                {`PI: ${distribution?.pi ? distribution.pi.toString() : <LoopingText />}`}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} lg={2}>{`Total wait time: ${
                                distribution?.metadata.waitTime ? (
                                    (distribution?.metadata.waitTime / 1000).toFixed(7) + ' s'
                                ) : (
                                    <LoopingText />
                                )
                            }`}</Col>

                            <Col sm={12} lg={2}>{`Response time: ${
                                distribution?.metadata.responseTime ? (
                                    (distribution?.metadata.responseTime / 1000).toFixed(7) + ' s'
                                ) : (
                                    <LoopingText />
                                )
                            }`}</Col>

                            <Col sm={12} lg={2}>{`Generation time: ${
                                distribution?.metadata.generateTime ? (
                                    (distribution?.metadata.generateTime / 1000).toFixed(7) + ' s'
                                ) : (
                                    <LoopingText />
                                )
                            }`}</Col>

                            <Col sm={12} lg={2}>{`Approximation time: ${
                                distribution?.metadata.approximationTime ? (
                                    (distribution?.metadata.approximationTime / 1000).toFixed(7) + ' s'
                                ) : (
                                    <LoopingText />
                                )
                            }`}</Col>

                            <Col sm={12} lg={2}>{`Response size: ${
                                distribution?.metadata.responseSize ? (
                                    distribution.metadata.responseSize.toFixed(7) + 'kb'
                                ) : (
                                    <LoopingText />
                                )
                            }`}</Col>

                            <Col sm={12} lg={2}>{`Number of points: ${
                                distribution?.points ? distribution.points.length : <LoopingText />
                            }`}</Col>
                        </Row>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default connector(ActionInput);
