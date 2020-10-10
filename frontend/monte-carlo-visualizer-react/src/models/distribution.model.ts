import { Decimal } from 'decimal.js';

import { Point } from './point.model';

export interface Distribution {
    points: Point[];

    pi: Decimal;

    metadata: DistributionMetadata;
}

export interface DistributionMetadata {
    generateTime: number;
    approximationTime: number;
    responseTime: number;
    responseSize: number;
    waitTime: number;
}
