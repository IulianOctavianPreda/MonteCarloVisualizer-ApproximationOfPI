import React, { useState } from 'react';
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
    const [inputValue, setInputValue] = useState<number>(0);

    const requestDistribution = async () => {
        props.addDistribution(await selectedAction.action(inputValue));
    };
    return (
        <div className="input-group">
            <input
                type="number"
                className="form-control"
                value={inputValue}
                onChange={(e) => setInputValue(parseInt(e.target.value, 10))}
            />
            <div className="input-group-append">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={async () => await requestDistribution()}
                >
                    {selectedAction.name}
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                    {props.apiActions.map((x) => (
                        <button key={x.name} className="dropdown-item" onClick={() => setSelectedAction(x)}>
                            {x.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default connector(ActionInput);
