import assert from "assert";

import { MonteCarloService } from "./../../services/monte-carlo.service";

describe('MonteCarloService', () => {
  const monteCarloService: MonteCarloService = new MonteCarloService();

  it('generatePositiveDistribution()', () => {
    const numberOfPoints = 1000;
    const distribution = monteCarloService.generatePositiveDistribution(numberOfPoints);
    assert(!!distribution);
    assert(Array.isArray(distribution.points));
    assert(distribution.points.length === numberOfPoints);
    assert(distribution.points.every((p) => p.x >= 0 && p.y >= 0));
  });

  it('generateDistribution()', () => {
    const numberOfPoints = 1000;
    const distribution = monteCarloService.generateDistribution(numberOfPoints);
    assert(!!distribution);
    assert(Array.isArray(distribution.points));
    assert(distribution.points.length === numberOfPoints);
  });
});
