export interface CaptureGoalData {
  targetAmount: number;
  targetYear?: number;
  targetDate: Date | string;
  upfrontInvestment: number;
  monthlyInvestment: number;
  riskAppetite: string;
}

export interface GoalDetails {
  id?: string;
  name?: string;
  description?: string;
}

export interface ApiFields {
  description: string;
}

export interface GoalsObjectiveApiResponse {
  index: string;
  fields: ApiFields;
}

export interface GoalsObjectiveLinkApiResponse {
  entity_id: string;
  linked_obj_index: string;
  list_obj_index: string;
}
