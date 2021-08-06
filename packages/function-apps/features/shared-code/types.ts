export enum HttpMethod {
  GET = "GET",
}

export enum AppConfigPath {
  KEY_VALUES = "/kv",
}

export interface TransformedFeatureItem {
  id: string;
  description?: string;
  enabled: boolean;
  users?: string[];
  groups?: FilterGroupItem[];
}

export interface FilterGroupItem {
  Name: string;
  RolloutPercentage: number;
}

export interface FeatureAppValue {
  id: string;
  description: string;
  enabled: boolean;
  conditions: {
    client_filters: TargetingClientFilterItem[];
  };
}

export interface TargetingClientFilterItem {
  name: "Microsoft.Targeting";
  parameters: {
    audience: {
      users: string[];
      groups: string[];
    };
  };
}

export interface FeatureAppResponseItem {
  etag: string;
  key: string;
  label: string;
  contentType: string;
  values: FeatureAppValue;
  lastModified: string;
  locked: boolean;
  tags: string[];
}
