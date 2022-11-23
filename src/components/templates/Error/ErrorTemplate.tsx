import React from 'react';

export type Props = { statusCode: 500 | 404 };

const Component = ({statusCode}: Props) => {

    // TODO: Error Template design
    return <div>Error: {statusCode} </div>
}

export default Component;