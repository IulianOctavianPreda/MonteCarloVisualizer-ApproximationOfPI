import { Distribution } from '../../models/distribution.model';
import { Action } from '../actions/action';
import { ActionsEnum } from './../actions/actions-enum';

export const DistributionsReducer = (state: Distribution[] = [], action: Action<Distribution>): Distribution[] => {
    if (action.type === ActionsEnum.AddDistribution) {
        return [...state, action.payload];
    }
    if (action.type === ActionsEnum.DeleteDistribution) {
        return state.filter((x) => x !== action.payload);
    }
    return state;
};
