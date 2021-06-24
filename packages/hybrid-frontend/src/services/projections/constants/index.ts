import { RiskModel, SedolCode } from '../../types';

export const projectionsDefaults = { riskModel: RiskModel.TAA6, sedolCode: SedolCode.BYX8KW0 };

// used (along with the client's age) to determine the time horizon for projections charts
export const TARGET_RETIREMENT_AGE = 100;
