export interface ValidationError {
  property: string;
  message: string;
  code: string;
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
