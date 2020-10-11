import { Distribution } from '../../models/distribution.model';
import { Action } from '../actions/action';
import { ActionsEnum } from './../actions/actions-enum';

export const DistributionsReducer = (state: Distribution[] = [], action: Action<Distribution>): Distribution[] => {
    console.log('add red', state);

    if (action.type === ActionsEnum.AddDistribution) {
        const dist = action.payload;
        dist.id = state.length;
        return [...state, dist];
    }
    if (action.type === ActionsEnum.DeleteDistribution) {
        return state.filter((x) => x.id !== action.payload.id);
    }
    if (action.type === ActionsEnum.UpdateDistribution) {
        return [...state.filter((x) => x.id !== action.payload.id), action.payload];
    }
    return state;
};
