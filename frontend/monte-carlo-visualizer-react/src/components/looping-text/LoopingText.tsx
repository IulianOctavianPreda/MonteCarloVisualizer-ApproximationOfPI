import './LoopingText.scss';

import React, { useEffect, useState } from 'react';
import { Circular } from 'singlie';

type Props = {
    textArr: string[];
    interval: number;
};

const LoopingText = (props: Props) => {
    const [text, setText] = useState<string>(props.textArr[0] ?? '');
    useEffect(() => {
        const linkedList = new Circular();
        props.textArr.forEach((x) => linkedList.append(x));
        let node = linkedList.node(0);
        const interval = setInterval(() => {
            setText(node.value);
            if (node?.next) {
                node = node.next;
            }
        }, props.interval);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return <span className="text">{text}</span>;
};

LoopingText.defaultProps = {
    textArr: ['Loading', 'Loading.', 'Loading..', 'Loading...'],
    interval: 300
};

export default LoopingText;
