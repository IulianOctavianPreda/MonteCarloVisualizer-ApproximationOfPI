import { BindingScope, CoreTags, injectable } from "@loopback/core";
import { performance } from "perf_hooks";

import { Distribution } from "../models/distribution.model";
import { Point } from "../models/point.model";

@injectable({
  scope: BindingScope.SINGLETON,
  tags: {[CoreTags.SERVICE_INTERFACE]: MonteCarloService}
})
export class MonteCarloService {
  public generatePositiveDistribution(numberOfPoints: number): Distribution {
    const startTime = performance.now();
    const arr: Point[] = [];
    for (let i = 0; i < numberOfPoints; i++) {
      arr.push({
        x: this.randomNumberInRange(numberOfPoints),
        y: this.randomNumberInRange(numberOfPoints)
      });
    }
    return {points: arr, elapsedTime: this.getElapsedTime(startTime)};
  }

  public generateDistribution(numberOfPoints: number): Distribution {
    const startTime = performance.now();
    const arr: Point[] = [];
    for (let i = 0; i < numberOfPoints; i++) {
      arr.push({
        x: this.randomNumberInRange(numberOfPoints, -numberOfPoints),
        y: this.randomNumberInRange(numberOfPoints, -numberOfPoints)
      });
    }
    return {points: arr, elapsedTime: this.getElapsedTime(startTime)};
  }

  private randomNumberInRange(max: number, min = 0): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getElapsedTime(startTime: number) {
    return performance.now() - startTime;
  }
}
