import { service } from "@loopback/core";
import { get, param } from "@loopback/rest";

import { MonteCarloMultiThreadedService } from "../services/monte-carlo-multi-threaded.service";

export class MonteCarloMultiThreadedController {
  constructor(
    @service(MonteCarloMultiThreadedService)
    private monteCarloMultiThreadedService: MonteCarloMultiThreadedService
  ) {}

  @get('/performance/whole/{numberOfPoints}')
  async monteCarloMultiThreadedDistribution(
    @param.path.number('numberOfPoints') numberOfPoints: number
  ) {
    return this.monteCarloMultiThreadedService.generateDistributionMultiThreaded(
      numberOfPoints,
      numberOfPoints,
      numberOfPoints
    );
  }
}
