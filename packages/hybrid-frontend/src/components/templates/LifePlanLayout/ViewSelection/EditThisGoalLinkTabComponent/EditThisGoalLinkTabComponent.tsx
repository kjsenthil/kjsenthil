import * as React from 'react';
import { TabProps } from '@tsw/react-components';
import { EditThisGoalLink } from './EditThisGoalLinkTabComponent.styles';

const EditThisGoalLinkTabComponent = React.forwardRef((props: TabProps<'a'>, ref) => (
  <EditThisGoalLink {...props} ref={ref} />
));

export default EditThisGoalLinkTabComponent;
