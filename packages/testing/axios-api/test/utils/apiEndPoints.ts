export const API_ENDPOINTS = {
  MYACCOUNT_CLIENTS: "/myaccount/clients/{id}",
  MYACCOUNT_PERFORMANCE_CONTACT: "/myaccount/performance-contact/{id}",
  MYACCOUNT_INVESTMENT_SUMMARY_ACCOUNTS:
    "/myaccount/investment-summary-account",
  MYACCOUNT_CONTRIBUTION: "/myaccount/contribution-account/{id}",
  ISA_CONTRIBUTIONS: "/myaccount/isa-contributions/{id}",
  MYACCOUNT_AGGREGATED_NET_CONTRIBUTIONS:
    "/myaccount/netcontribution-accounts-aggregated",
  MYACCOUNT_AGGREGATED_PERFORMANCE_ACCOUNTS:
    "/myaccount/performance-accounts-aggregated",
  PROJECTIONS_CURRENT_PROJECTION: "/projections/current-projection",
  PROJECTIONS_TARGET_PROJECTION: "/projections/target-projection",
  MYACCOUNT_BREAKDOWN_ALLOCATION: "/myaccount/breakdown-allocation/{id}",
  MYACCOUNT_AGGREGATED_BREAKDOWN_ALLOCATION:
    "/myaccount/aggregated-breakdown-allocation",
  MYACCOUNT_MONTHLY_SAVINGS: "/myaccount/accounts/{id}/monthly-savings",
  MYACCOUNT_INVESTMENTS: "/myaccount/accounts/{id}/investments",
  CREATE_GOAL_ADDITIONAL_FIELDS: "/resourceful/entity/client/goals",
  CREATE_GOAL_LESS_FIELDS: "/resourceful/entity/client-v4/goals",
  CREATE_OBJECTIVE: "/resourceful/entity/client-v4/objectives",
  TILNEY_ASSET_MODEL: "/Assets/tilney-asset-model/{riskName}",
  GET_ASSET_ALLOCATION_BREAKDOWN: "/Assets/assetallocation/{sedol}",
  GET_ASSET_DETAILS: "/Assets/assetdetail/{sedol}",
  GET_RISK_PROFILE_QUESTIONS: "/OxfordRisk/questions",
  GET_STANDING_DATA: "/Assets/readymade/standingdata",
  IDENTITY_LOGIN: "/login",
  IDENTITY_PIN: "/pin",
  IDENTITY_REFRESH_TOKEN: "/refresh-token",
  LINK_GOAL_TO_OBJECTIVE:
    "/resourceful/entity/client-v4/goals/{objective-index}/objective_link",
  LOGIN_TO_XPLAN: "/touch/web_login",
  POST_PROJECTIONS: "/Assets/projections",
  PROJECTIONS_PORTFOLIO_ASSET_ALLOCATION:
    "/projections/portfolio-asset-allocation",
  PROJECTIONS_PORTFOLIO_RISK_PROFILE: "/projections/portfolio-risk-profile",
  UPDATE_GOAL: "/resourceful/entity/client-v4/goals/{goal-index}",
  UPDATE_OBJECTIVE:
    "/resourceful/entity/client-v4/objectives/{objective-index}",
  GET_GOALS: "/resourceful/entity/client-v4/goals",
};
