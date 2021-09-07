export interface GenericApiPayload<A = Record<string, unknown>, T = string> {
  data: {
    type?: T;
    id?: string | null;
    attributes: A;
  };
}

export type GenericResponseData<A = Record<string, unknown>> = GenericApiPayload<A>;

export type GenericRequestPayload<A = Record<string, unknown>, T = string> = GenericApiPayload<
  A,
  T
>;

export interface GenericResponsePayload<
  A = Record<string, unknown>,
  T = string,
  I = null,
  R = null
> {
  data: GenericApiPayload<A, T>['data'] & {
    links?: {
      self: string;
    };
    relationship?: R;
  };
  included?: I;
}
