import './App.scss';

import React from 'react';

import ActionInput from '../action-input/ActionInput';

const App = () => {
    return (
        <div className="h-100 w-100 container-fluid justify-content-center align-items-center">
            <ActionInput />
        </div>
    );
};

export default App;
