import { Distribution } from '../../models/distribution.model';
import { Action } from './action';
import { ActionsEnum } from './actions-enum';

export const deleteDistribution = (distribution: Distribution): Action<Distribution> => {
    return {
        type: ActionsEnum.DeleteDistribution,
        payload: distribution
    };
};
