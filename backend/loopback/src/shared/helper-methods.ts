import { performance } from "perf_hooks";

export class Helper {
  public static randomNumberInRange(max: number, min = 0): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static getElapsedTime(startTime: number) {
    return performance.now() - startTime;
  }

  public static getTime() {
    return performance.now();
  }
}
