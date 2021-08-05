export enum NavPaths {
  ROOT_PAGE = '/',
  MY_ACCOUNT_BASE_URL = '/my-account',
  LOGOUT_PAGE = '/my-account/logout',
  LIFE_PLAN_PAGE = '/my-account/life-plan',
  LIFE_PLAN_MANAGEMENT = '/my-account/goals/life-plan-management',
  BUYING_A_HOME_MANAGEMENT = '/my-account/goals/buying-a-home-management',
  MY_CHILDS_EDUCATION_MANAGEMENT = '/my-account/goals/my-childs-education-management',
  STARTING_A_BUSINESS_MANAGEMENT = '/my-account/goals/starting-a-business-management',
  EMERGENCY_FUNDS_MANAGEMENT = '/my-account/goals/emergency-funds-management',
  SOMETHING_ELSE_MANAGEMENT = '/my-account/goals/something-else-management',
  ADD_CASH_PAGE = '/my-account/add-cash',
}

export const goalCreationPaths: Record<string, { name: string; path?: NavPaths }> = {
  retirement: {
    name: 'Retirement',
    path: NavPaths.LIFE_PLAN_MANAGEMENT,
  },
  buyingAHome: {
    name: 'Buying a home',
  },
  myChildsEducation: {
    name: "My child's education",
  },
  startingABusiness: {
    name: 'Starting a business',
  },
  emergencyFunds: {
    name: 'Emergency funds',
  },
  somethingElse: {
    name: 'Something else',
  },
};
