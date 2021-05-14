export interface GenericResponseData<A = Record<string, unknown>> {
  data: {
    attributes: A;
  };
}

export interface GenericRequestPayload<A = Record<string, unknown>, T = string> {
  data: {
    type?: T;
    id?: string | null;
    attributes: A;
  };
}
