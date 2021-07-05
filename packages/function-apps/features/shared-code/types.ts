export enum HttpMethod {
  GET = 'GET'
}

export enum AppConfigPath {
  KEY_VALUES = '/kv'
}

export class FeatureToggle {
  id: string;
  description: string;
  enabled: boolean;

  constructor(id: string, description: string, enabled: boolean) {
    this.id = id;
    this.description = description;
    this.enabled = enabled;
  }
}
