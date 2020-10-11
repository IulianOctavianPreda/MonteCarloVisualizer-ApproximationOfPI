import { Decimal } from 'decimal.js';

import { Point } from './point.model';

export interface Distribution {
    id: number;
    points: Point[];

    pi: Decimal;

    metadata: DistributionMetadata;
}

export interface DistributionMetadata {
    imgUrl: string;
    generateTime: number;
    approximationTime: number;
    responseTime: number;
    responseSize: number;
    waitTime: number;
}
