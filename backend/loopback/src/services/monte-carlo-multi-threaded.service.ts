import { BindingScope, CoreTags, injectable } from "@loopback/core";

import { Point } from "../models/point.model";
import { InlineWorker } from "../shared/inline-web-worker";
import { Helper } from "./../shared/helper-methods";

@injectable({
  scope: BindingScope.SINGLETON,
  tags: {[CoreTags.SERVICE_INTERFACE]: MonteCarloMultiThreadedService}
})
export class MonteCarloMultiThreadedService {
  public async generatePositiveDistribution(numberOfPoints: number) {
    return this.generateDistributionMultiThreaded(numberOfPoints, 0, numberOfPoints);
  }

  public async generateWholeDistribution(numberOfPoints: number) {
    return this.generateDistributionMultiThreaded(numberOfPoints, -numberOfPoints, numberOfPoints);
  }

  public async generateDistributionMultiThreaded(numberOfPoints: number, min: number, max: number) {
    // const startTime = performance.now();

    const helper = Helper;
    const promises: Promise<MessageEvent<Point[]>>[] = [];
    let ratio = numberOfPoints / 100;
    if (!Number.isInteger(ratio)) {
      ratio = Math.floor(ratio);
      promises.push(
        this.generateDistributionWorker().run({
          numberOfPoints: numberOfPoints - ratio * 100,
          min,
          max,
          helper
        })
      );
    }
    for (let i = 0; i < ratio; i++) {
      promises.push(
        this.generateDistributionWorker().run({
          numberOfPoints: ratio,
          min,
          max,
          helper
        })
      );
    }

    const resolve = await Promise.all(promises);
    // const dist: Distribution = {
    //   elapsedTime: helper.getElapsedTime(startTime),
    //   points: resolve
    // };
    return resolve;
  }

  private generateDistributionWorker(): InlineWorker<Point[]> {
    const worker = new InlineWorker<Point[]>(({numberOfPoints, min, max, helper}) => {
      const arr: Point[] = [];
      for (let i = 0; i < numberOfPoints; i++) {
        arr.push({
          x: helper.randomNumberInRange(max, min),
          y: helper.randomNumberInRange(max, min)
        });
      }
      self.postMessage(arr, '');
    });
    return worker;
  }
}
