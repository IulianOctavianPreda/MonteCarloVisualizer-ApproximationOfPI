import assert from "assert";

import { MonteCarloMultiThreadedService } from "./../../services/monte-carlo-multi-threaded.service";

describe('MonteCarloService', () => {
  const monteCarloService: MonteCarloMultiThreadedService = new MonteCarloMultiThreadedService();

  it('generatePositiveDistribution()', async () => {
    const numberOfPoints = 1000;
    const distribution = await monteCarloService.generateNaturalDistribution(numberOfPoints);
    assert(!!distribution);
    assert(Array.isArray(distribution.points));
    assert(distribution.points.length === numberOfPoints);
    assert(distribution.points.every((p) => p.x >= 0 && p.y >= 0));
  });

  it('generateDistribution()', async () => {
    const numberOfPoints = 1000;
    const distribution = await monteCarloService.generateWholeDistribution(numberOfPoints);
    assert(!!distribution);
    assert(Array.isArray(distribution.points));
    assert(distribution.points.length === numberOfPoints);
  });
});
