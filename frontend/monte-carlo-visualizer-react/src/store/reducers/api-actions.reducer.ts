import { Distribution } from '../../models/distribution.model';
import { MonteCarloApi } from './../../services/monte-carlo.api';

export interface ApiAction {
    name: string;
    action: (value: number) => Promise<Distribution>;
}

export const ApiActionsReducer = (): ApiAction[] => {
    return [
        {
            name: 'Natural Number Distribution',
            action: (value: number) => {
                return MonteCarloApi.getNaturalDistribution(value);
            }
        },
        {
            name: 'Whole Number Distribution',
            action: (value: number) => {
                return MonteCarloApi.getWholeDistribution(value);
            }
        },
        {
            name: 'Multi Threaded Natural Number Distribution',
            action: (value: number) => {
                return MonteCarloApi.getMultiThreadedNaturalDistribution(value);
            }
        },
        {
            name: 'Multi Threaded Whole Number Distribution',
            action: (value: number) => {
                return MonteCarloApi.getMultiThreadedWholeDistribution(value);
            }
        }
    ];
};
