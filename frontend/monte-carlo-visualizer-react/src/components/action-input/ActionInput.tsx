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
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [disableButtons, setDisableButtons] = useState<boolean>(false);
    const [distribution, setDistribution] = useState<Distribution>();

    useEffect(() => {
        if (distribution?.points && !distribution?.approximatedPi) {
            const { pi, elapsedTime } = computePi(distribution.points);

            distribution.approximatedPi = pi;
            distribution.elapsedTimeApproximatingPi = elapsedTime;

            setDistribution(distribution);
            props.addDistribution(distribution);
        }
    }, [distribution]);
    useEffect(() => {}, [disableButtons]);

    const requestDistribution = async () => {
        setShowInfo(false);
        setDisableButtons(true);

        setDistribution(await selectedAction.action(inputValue ?? 0));

        setShowInfo(true);
        setDisableButtons(false);
    };

    return (
        <Container fluid>
            <Row>
                <InputGroup>
                    <FormControl
                        placeholder="Number of Points"
                        aria-label="Number of Points"
                        aria-describedby="basic-addon2"
                        onChange={(e) => setInputValue(parseInt(e.target.value, 10))}
                    />

                    <InputGroup.Append>
                        <Button
                            variant="outline-info"
                            onClick={async () => await requestDistribution()}
                            disabled={disableButtons}
                        >
                            {disableButtons ? <LoopingText /> : selectedAction.name}
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
            <Row className={`justify-content-center align-items-center ${showInfo ? 'visible' : 'invisible'}`}>
                <Col className="px-0 my-1">
                    <Alert variant="info" className="d-flex justify-content-between">
                        <span>{`Response time: ${
                            distribution?.elapsedTime ? (distribution?.elapsedTime / 1000).toFixed(7) : <LoopingText />
                        }`}</span>
                        <span>{`Number of points: ${
                            distribution?.points.length ? distribution?.points.length : <LoopingText />
                        }`}</span>
                        <span>{`Approximation time: ${
                            distribution?.elapsedTimeApproximatingPi ? (
                                (distribution.elapsedTimeApproximatingPi / 1000).toFixed(7)
                            ) : (
                                <LoopingText />
                            )
                        }`}</span>
                        <span>{`PI: ${
                            distribution?.approximatedPi ? distribution?.approximatedPi.toString() : <LoopingText />
                        }`}</span>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default connector(ActionInput);
