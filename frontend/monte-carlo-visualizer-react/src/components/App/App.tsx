import './App.scss';

import React from 'react';

import ActionInput from '../action-input/ActionInput';

const App = () => {
    return (
        <div className="h-100 container-fluid d-flex justify-content-center align-items-center">
            <div className="col-8 ">
                <ActionInput />
            </div>
        </div>
    );
};

export default App;
