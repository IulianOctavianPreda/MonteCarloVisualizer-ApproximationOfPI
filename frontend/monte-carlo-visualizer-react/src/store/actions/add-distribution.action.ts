import { Distribution } from './../../models/distribution.model';
import { Action } from './action';
import { ActionsEnum } from './actions-enum';

export const addDistribution = (distribution: Distribution): Action<Distribution> => {
    return {
        type: ActionsEnum.AddDistribution,
        payload: distribution
    };
};
