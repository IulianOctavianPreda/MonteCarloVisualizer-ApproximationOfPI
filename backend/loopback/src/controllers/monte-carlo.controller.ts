import { service } from "@loopback/core";
import { get, param } from "@loopback/rest";

import { Distribution } from "../models/distribution.model";
import { MonteCarloService } from "./../services/monte-carlo.service";

export class MonteCarloController {
  constructor(@service(MonteCarloService) private monteCarloService: MonteCarloService) {}

  @get('/natural/{numberOfPoints}')
  naturalMonteCarloDistribution(
    @param.path.number('numberOfPoints') numberOfPoints: number
  ): Distribution {
    return this.monteCarloService.generateNaturalDistribution(numberOfPoints);
  }

  @get('/whole/{numberOfPoints}')
  monteCarloDistribution(
    @param.path.number('numberOfPoints') numberOfPoints: number
  ): Distribution {
    return this.monteCarloService.generateWholeDistribution(numberOfPoints);
  }
}
