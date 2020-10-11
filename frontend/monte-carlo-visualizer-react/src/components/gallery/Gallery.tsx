import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { GraphProcessor } from '../../shared/web-workers/graph-processor.worker';
import { updateDistribution } from '../../store/actions/update-distribution.action';
import { ApplicationState } from '../../store/reducers/application-state';

const mapStateToProps = (state: ApplicationState) => {
    return {
        distributions: state.distributions
    };
};

const mapDispatch = () => {
    return {
        updateDistribution
    };
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

const Gallery = (props: Props) => {
    const [graphProcessor] = useState(new GraphProcessor());

    useEffect(() => {
        graphProcessor.worker.onMessage().subscribe((x) => {
            // props.updateDistribution(x);
            // graphProcessor.worker.terminate();
        });

        return () => {};
    }, []);

    useEffect(() => {
        console.log(props.distributions);
        if (props.distributions[0])
            graphProcessor.worker.postMessage({ points: props.distributions[0].points, size: 400 });
    }, [props]);

    return <></>;
};

export default connector(Gallery);
