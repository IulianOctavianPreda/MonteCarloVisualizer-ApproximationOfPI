import Konva from 'konva';

import { Point } from './../../models/point.model';

// depricated
export default class GraphWorker extends Worker {
    public inCircleColor = 'dodgerblue';
    public color = 'firebrick';

    constructor(stringUrl: string | URL = '') {
        super(stringUrl);
    }
    public createPoints = (points: Point[], size: number) => {
        const nrOfPoints = points.length;
        const ratio = points.length / size;

        let pointsArr = points.map((p) => {
            if (p.x ** 2 + p.y ** 2 < nrOfPoints ** 2) {
                return new Konva.Circle({
                    x: Math.floor(p.x / ratio),
                    y: Math.floor(p.y / ratio),
                    radius: 1,
                    fill: this.inCircleColor
                });
            }
            return new Konva.Circle({
                x: Math.floor(p.x / ratio),
                y: Math.floor(p.y / ratio),
                radius: 1,
                fill: this.color
            });
        });
        return pointsArr;
    };

    public imageFromCanvas = ({ points, size }: { points: Point[]; size: number }) => {
        const layer = new Konva.Layer();
        this.createPoints(points, size).forEach((p) => layer.add(p));

        return layer.toDataURL({ pixelRatio: 3 });
    };

    onmessage = (ev: any) => {
        this.postMessage(this.imageFromCanvas(ev.data));
    };
}
