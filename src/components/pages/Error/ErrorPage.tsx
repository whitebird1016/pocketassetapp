import React from 'react';

import Error, { Props as ErrorTemplateProps } from '../../templates/Error';

type Props = {
  statusCode: ErrorTemplateProps['statusCode'];
};

const Component = ({ statusCode }: Props): React.ReactElement => {
  return <Error statusCode={statusCode} />;
};

export default Component;