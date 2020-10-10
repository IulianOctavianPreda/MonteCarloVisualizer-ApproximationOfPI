import { BindingScope, CoreTags, injectable } from "@loopback/core";
import workerize from "node-inline-worker";

import { Distribution } from "../models/distribution.model";
import { Point } from "../models/point.model";
import { Helper } from "./../shared/helper-methods";

@injectable({
  scope: BindingScope.SINGLETON,
  tags: {[CoreTags.SERVICE_INTERFACE]: MonteCarloMultiThreadedService}
})
export class MonteCarloMultiThreadedService {
  public async generateNaturalDistribution(numberOfPoints: number): Promise<Distribution> {
    return this.generateDistributionMultiThreaded(numberOfPoints, 0, numberOfPoints);
  }

  public async generateWholeDistribution(numberOfPoints: number): Promise<Distribution> {
    return this.generateDistributionMultiThreaded(numberOfPoints, -numberOfPoints, numberOfPoints);
  }

  public async generateDistributionMultiThreaded(
    numberOfPoints: number,
    min: number,
    max: number
  ): Promise<Distribution> {
    const startTime = Helper.getTime();
    const promises: Promise<Point[]>[] = [];
    const divider = 10000;
    let ratio = numberOfPoints / divider;
    if (!Number.isInteger(ratio)) {
      ratio = Math.floor(ratio);
      promises.push(this.generateDistributionWorker(numberOfPoints - ratio * divider, min, max));
    }
    for (let i = 0; i < ratio; i++) {
      promises.push(this.generateDistributionWorker(ratio * divider, min, max));
    }

    return {
      elapsedTime: Helper.getElapsedTime(startTime),
      points: (await Promise.all(promises)).flatMap((x) => x)
    };
  }

  private generateDistributionWorker(
    numberOfPoints: number,
    min: number,
    max: number
  ): Promise<Point[]> {
    const worker = workerize(({numberOfPoints, min, max}) => {
      function randomNumberInRange(max: number, min = 0): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const arr: Point[] = [];
      for (let i = 0; i < numberOfPoints; i++) {
        arr.push({
          x: randomNumberInRange(max, min),
          y: randomNumberInRange(max, min)
        });
      }
      return arr;
    });
    return worker({numberOfPoints, min, max});
  }
}
