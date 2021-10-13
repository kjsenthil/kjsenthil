export interface AddressLookupContext {
  suggestedAddresses: Array<string>;
  address: {
    addressLine1: string | null;
    addressLine2: string | null;
    town: string | null;
    postCode: string | null;
    country: string | null;
  };
  canContinue: {
    fromEnteringManually: boolean;
  };
}

export interface AddressLookupSchema {
  states: {
    idle: {};
    enteringManually: {};
    searchingAddresses: {};
    listingAddresses: {};
    pickingAddress: {};
    addressPicked: {};
  };
}

export type SetAddressDataEvent = {
  type: 'SET_ADDRESS';
  payload: Partial<AddressLookupContext['address']>;
};

export type PickAddressDataEvent = {
  type: 'PICK_ADDRESS';
  payload: Record<keyof AddressLookupContext['address'], string>;
};

export type AddressLookupEvents =
  | SetAddressDataEvent
  | PickAddressDataEvent
  | { type: 'ENTER_MANUALLY' };
