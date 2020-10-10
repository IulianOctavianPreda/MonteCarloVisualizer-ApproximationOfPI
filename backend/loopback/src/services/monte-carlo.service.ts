import { BindingScope, CoreTags, injectable } from "@loopback/core";

import { Distribution } from "../models/distribution.model";
import { Point } from "../models/point.model";
import { Helper } from "./../shared/helper-methods";

@injectable({
  scope: BindingScope.SINGLETON,
  tags: {[CoreTags.SERVICE_INTERFACE]: MonteCarloService}
})
export class MonteCarloService {
  public generatePositiveDistribution(numberOfPoints: number): Distribution {
    return this.generateDistribution(numberOfPoints, 0, numberOfPoints);
  }

  public generateWholeDistribution(numberOfPoints: number): Distribution {
    return this.generateDistribution(numberOfPoints, -numberOfPoints, numberOfPoints);
  }

  private generateDistribution(numberOfPoints: number, min: number, max: number): Distribution {
    const startTime = Helper.getTime();
    const arr: Point[] = [];
    for (let i = 0; i < numberOfPoints; i++) {
      arr.push({
        x: Helper.randomNumberInRange(max, min),
        y: Helper.randomNumberInRange(max, min)
      });
    }
    return {elapsedTime: Helper.getElapsedTime(startTime), points: arr};
  }
}
