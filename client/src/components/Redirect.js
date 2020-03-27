import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

const Redirect = props => {
    useEffect(() => {
        navigate(props.to);
    }, [props.to]);

    return (<></>);
}

export default Redirect;