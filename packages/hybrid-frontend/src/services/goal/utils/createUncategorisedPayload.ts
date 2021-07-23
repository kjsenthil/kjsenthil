import { GoalCategory, UncategorisedPayload } from '../types';
import { goalsDefaultValues } from '../config';

const createUncategorisedPayload = (): { fields: UncategorisedPayload } => ({
  fields: {
    ...goalsDefaultValues,
    category: GoalCategory.UNCATEGORIZED,
    description: 'just show me my projection',
  },
});

export default createUncategorisedPayload;
