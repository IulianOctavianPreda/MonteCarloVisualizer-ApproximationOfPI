import { combineReducers } from 'redux';

import { Distribution } from '../../models/distribution.model';
import { ApiAction, ApiActionsReducer } from './api-actions.reducer';
import { DistributionsReducer } from './distributions.reducer';

export interface ApplicationState {
    apiActions: ApiAction[];
    distributions: Distribution[];
}
export default combineReducers({
    apiActions: ApiActionsReducer,
    distributions: DistributionsReducer
});
