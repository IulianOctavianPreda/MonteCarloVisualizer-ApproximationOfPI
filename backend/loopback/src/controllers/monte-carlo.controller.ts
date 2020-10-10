import { service } from "@loopback/core";
import { get, param } from "@loopback/rest";

import { Distribution } from "../models/distribution.model";
import { MonteCarloService } from "./../services/monte-carlo.service";

export class MonteCarloController {
  constructor(@service(MonteCarloService) private monteCarloService: MonteCarloService) {}

  @get('/positive/{numberOfPoints}')
  positiveMonteCarloDistribution(
    @param.path.number('numberOfPoints') numberOfPoints: number
  ): Distribution {
    return this.monteCarloService.generatePositiveDistribution(numberOfPoints);
  }

  @get('/whole/{numberOfPoints}')
  monteCarloDistribution(
    @param.path.number('numberOfPoints') numberOfPoints: number
  ): Distribution {
    return this.monteCarloService.generateDistribution(numberOfPoints);
  }
}
