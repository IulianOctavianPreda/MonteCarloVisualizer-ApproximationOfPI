/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useState } from 'react';
import { Circle, Layer, Stage } from 'react-konva';
import GraphWorker from 'worker-loader!../../../src/shared/web-workers/graph-creator.worker';

import { Point } from '../../models/point.model';

type Props = {
    size: number;
    points: Point[];
};

const Graph = (props: Props) => {
    const [inCircleColor, setInCircleColor] = useState<string>('dodgerblue');
    const [color, setColor] = useState<string>('firebrick');

    useEffect(() => {
        const web = new GraphWorker();
        web.onmessage = (ev) => {
            console.log(ev);
        };
        web.postMessage({ points: props.points, size: props.size });
    }, [props]);

    const createPoints = () => {
        const nrOfPoints = props.points.length;
        const ratio = props.points.length / props.size;

        let pointsArr = props.points.map((p, index) => {
            if (p.x ** 2 + p.y ** 2 < nrOfPoints ** 2) {
                return (
                    <Circle
                        key={index}
                        x={Math.floor(p.x / ratio)}
                        y={Math.floor(p.y / ratio)}
                        radius={1}
                        fill={inCircleColor}
                    />
                );
            }
            return (
                <Circle key={index} x={Math.floor(p.x / ratio)} y={Math.floor(p.y / ratio)} radius={1} fill={color} />
            );
        });
        return pointsArr;
    };

    return (
        <>
            <Stage width={props.size} height={props.size}>
                <Layer>{createPoints()}</Layer>
            </Stage>
        </>
    );
};

export default Graph;
