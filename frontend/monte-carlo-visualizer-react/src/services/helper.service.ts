import { Decimal } from 'decimal.js';

import { Point } from './../models/point.model';

export const computePi = (points: Point[]): { pi: Decimal; elapsedTime: number } => {
    const startingTime = performance.now();
    const numberOfPoints = points.length;
    const pointsInCircle = points.filter((p) => p.x ** 2 + p.y ** 2 < numberOfPoints ** 2).length;

    const pi = new Decimal((4 * pointsInCircle) / numberOfPoints);
    console.log(numberOfPoints, pointsInCircle, pi.toString());
    return {
        pi,
        elapsedTime: performance.now() - startingTime
    };
};
