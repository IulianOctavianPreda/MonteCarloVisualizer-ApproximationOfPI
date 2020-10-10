import { MonteCarloApi } from './../../services/monte-carlo.api';
import { ApiAction } from './../../shared/types/api-action';

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
