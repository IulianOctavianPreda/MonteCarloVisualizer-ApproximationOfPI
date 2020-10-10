import { AxiosResponse } from 'axios';

import { Distribution } from '../../models/distribution.model';
import { MonteCarloApi } from './../../services/monte-carlo.api';

export interface ApiAction {
    name: string;
    action: (value: number) => Promise<Distribution>;
}

const getDistribution = (response: AxiosResponse<Distribution>) => {
    const distribution = { ...response.data };
    distribution.metadata.responseSize = response.headers['content-length'] / 1024;
    return distribution;
};
export const ApiActionsReducer = (): ApiAction[] => {
    return [
        {
            name: 'Natural Number Distribution',
            action: (value: number) => {
                return MonteCarloApi.getNaturalDistribution(value).then((x) => getDistribution(x));
            }
        },
        {
            name: 'Whole Number Distribution',
            action: (value: number) => {
                return MonteCarloApi.getWholeDistribution(value).then((x) => getDistribution(x));
            }
        },
        {
            name: 'Multi Threaded Natural Number Distribution',
            action: (value: number) => {
                return MonteCarloApi.getMultiThreadedNaturalDistribution(value).then((x) => getDistribution(x));
            }
        },
        {
            name: 'Multi Threaded Whole Number Distribution',
            action: (value: number) => {
                return MonteCarloApi.getMultiThreadedWholeDistribution(value).then((x) => getDistribution(x));
            }
        }
    ];
};
