export interface CommonState<D = unknown, I = unknown, E = string | undefined> {
  data?: D;
  included?: I;
  error?: E;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export enum ClientAccountTypes {
  accounts = 'accounts',
  linkedAccounts = 'linked-accounts',
  contactSettings = 'contact-settings',
  userBasket = 'user-basket',
  emails = 'emails',
  addresses = 'addresses',
}
