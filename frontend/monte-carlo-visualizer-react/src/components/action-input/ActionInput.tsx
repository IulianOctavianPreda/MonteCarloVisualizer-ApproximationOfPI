import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import { connect, ConnectedProps } from 'react-redux';

import { ApiAction } from '../../shared/types/api-action';
import { addDistribution } from '../../store/actions/add-distribution.action';
import { ApplicationState } from '../../store/reducers/application-state';

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

    const requestDistribution = async () => {
        props.addDistribution(await selectedAction.action(inputValue ?? 0));
    };
    return (
        <InputGroup>
            <FormControl
                placeholder="Number of Points"
                aria-label="Number of Points"
                aria-describedby="basic-addon2"
                value={inputValue}
                onChange={(e) => setInputValue(parseInt(e.target.value, 10))}
            />

            <InputGroup.Append>
                <Button variant="outline-info" onClick={async () => await requestDistribution()}>
                    {selectedAction.name}
                </Button>
            </InputGroup.Append>

            <DropdownButton as={InputGroup.Append} variant="outline-warning" title="" id="input-group-dropdown-2">
                {props.apiActions.map((x) => (
                    <Dropdown.Item key={x.name} className="dropdown-item" onClick={() => setSelectedAction(x)}>
                        {x.name}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </InputGroup>
    );
};

export default connector(ActionInput);
