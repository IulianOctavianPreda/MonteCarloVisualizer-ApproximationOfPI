import { Point } from '../../models/point.model';
import { InlineWorker } from './inline.worker';

export class GraphProcessor {
    public worker = new InlineWorker(() => {
        console.log('in');
        const createCanvasWithPoints = (points: Point[], size: number) => {
            const nrOfPoints = points.length;
            const ratio = points.length / size;

            const canvas = new OffscreenCanvas(size, size);
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (ctx !== null) {
                points.forEach((p) => {
                    if (p.x ** 2 + p.y ** 2 < nrOfPoints ** 2) {
                        ctx.fillStyle = 'rgba(10, 81, 138, 1)';
                        ctx.beginPath();
                        ctx.arc(Math.floor(p.x / ratio), Math.floor(p.y / ratio), 1, 0, 2 * Math.PI);
                        ctx.stroke();
                    } else {
                        ctx.fillStyle = 'rgba(71, 37, 33, 1)';
                        ctx.beginPath();
                        ctx.arc(Math.floor(p.x / ratio), Math.floor(p.y / ratio), 1, 0, 2 * Math.PI);
                        ctx.stroke();
                    }
                });
            }
            return canvas;
        };

        const paintedCanvas = async ({ points, size }: { points: Point[]; size: number }) => {
            return await createCanvasWithPoints(points, size).convertToBlob();
        };

        onmessage = async (ev: any) => {
            // workaround since the library definitions are not up to date
            (postMessage as any)(await paintedCanvas(ev.data));
        };
    });
}
