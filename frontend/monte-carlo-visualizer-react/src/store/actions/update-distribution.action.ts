import { Distribution } from '../../models/distribution.model';
import { Action } from './action';
import { ActionsEnum } from './actions-enum';

export const updateDistribution = (distribution: Distribution): Action<Distribution> => {
    return {
        type: ActionsEnum.UpdateDistribution,
        payload: distribution
    };
};
