import { RiskModel, SedolCode } from '@tsw/react-components';

export const projectionsDefaults = { riskModel: RiskModel.TAA6, sedolCode: SedolCode.BYX8KW0 };

// used (along with the client's age) to determine the time horizon for projections charts
export const TARGET_RETIREMENT_AGE = 100;
