import { Point } from "./point.model";

export interface Distribution {
  points: Point[];
  metadata: DistributionMetadata;
}

export interface DistributionMetadata {
  generateTime: number;
}
