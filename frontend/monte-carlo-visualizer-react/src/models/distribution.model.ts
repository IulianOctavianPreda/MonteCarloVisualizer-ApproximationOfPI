import { Decimal } from 'decimal.js';

import { Point } from './point.model';

export interface Distribution {
    points: Point[];
    elapsedTime: number;

    approximatedPi: Decimal;

    elapsedTimeApproximatingPi: number;
}
