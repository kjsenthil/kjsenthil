import { CaptureGoalData } from '../components/organisms/CaptureGoal/CaptureGoal';

// API Config
export const xPlanBaseUrl = 'https://tbigroupuat2.xplan.iress.co.uk';

export const XplanAppID = '65wshs01RpizdxEwCh6G';

export const postApiHeader = {
  'X-Xplan-App-Id': XplanAppID,
  'Content-Type': 'application/json',
};

// To Parse entity ID on APIM
export const entityIDParse = /\{entity-id\}/;
export const goalIDParse = /\{objective-index\}/;

// Login
export const loginPayload =
  'username={username}&password={password}&loginmode=client&force=1&domain=coa&site_type=full';

const currDate = new Date();
const currDateFormat = currDate.toISOString().split('T')[0];
const currDateMonth = `${`0${currDate.getMonth() + 1}`.slice(-2)}-${`0${currDate.getDate()}`.slice(
  -2
)}`;

const goalsHardCodedPayloadValues = {
  status: '2', // E.g from 4 options - Goal is unfulfilled
  category: 5, // Investment category (dependent on retirements vs savings)
  advice_type: 3, // Investment advice type (dependent on retirements vs savings)
  xpt_external_id: null, // To Check
  owner: 'client',
  frequency: '12', //  how often they will take the money out
};

export const goalsPayLoad = (goalName: string = 'Create goal MVP', inputs: CaptureGoalData) => ({
  fields: {
    ...goalsHardCodedPayloadValues,
    description: `${goalName}Goal created on${currDateFormat}`,
    capture_date: {
      _val: currDateFormat,
      _type: 'Date',
    },
    target_amount: {
      _val: {
        code: 'GBP',
        value: {
          _val: inputs?.targetAmount,
          _type: 'BigDecimal',
        },
      },
      _type: 'Currency',
    },
    target_date: {
      _val: `${inputs?.targetYear}-${currDateMonth}`,
      _type: 'Date',
    },
    initial_investment: {
      _val: {
        code: 'GBP',
        value: {
          _val: inputs?.upfrontInvestment,
          _type: 'BigDecimal',
        },
      },
      _type: 'Currency',
    },
    regular_saving: {
      _val: {
        code: 'GBP',
        value: {
          _val: inputs?.monthlyInvestment,
          _type: 'BigDecimal',
        },
      },
      _type: 'Currency',
    },
    goal_level_risk_tolerance: inputs?.riskAppetite,
  },
});

// Objective
export const objectivePayLoad = (goalName: string = 'Create objective MVP') => ({
  fields: {
    capture_date: {
      _val: currDateFormat,
      _type: 'Date',
    },
    owner: 'client',
    description: `${goalName}Objective Created on${currDateFormat}`,
  },
});
