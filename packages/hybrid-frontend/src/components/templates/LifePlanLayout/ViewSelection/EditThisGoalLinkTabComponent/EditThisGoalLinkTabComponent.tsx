import * as React from 'react';
import { TabProps, Link } from '@tswdts/react-components';
import { EditThisGoalLink } from './EditThisGoalLinkTabComponent.styles';

const EditThisGoalLinkTabComponent = React.forwardRef((props: TabProps<typeof Link>, ref) => (
  <EditThisGoalLink {...props} ref={ref} />
));

export default EditThisGoalLinkTabComponent;
