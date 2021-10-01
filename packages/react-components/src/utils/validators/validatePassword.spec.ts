import validatePassword from './validatePassword';

describe('validatePassword', () => {
  it('passes validation', () => {
    expect(validatePassword('passW0rd', { minLength: 8, numDifferentTypes: 3 })).toStrictEqual(
      true
    );
  });

  it('fails validation on min numbers', () => {
    expect(
      validatePassword('pass word', { minLength: 4, minNumbers: 1, numDifferentTypes: 1 })
    ).toStrictEqual(false);
  });

  it('passes validation on min numbers', () => {
    expect(validatePassword('passW0rd', { minLength: 8, minNumbers: 1 })).toStrictEqual(true);
  });

  it('fails validation on spaces', () => {
    expect(validatePassword('pass word', { minLength: 4, numDifferentTypes: 1 })).toStrictEqual(
      false
    );
  });

  it('fails validation on min numbers', () => {
    expect(
      validatePassword('!@£$%^&', { minLength: 4, minNumbers: 1, numDifferentTypes: 0 })
    ).toStrictEqual(false);
  });

  it('fails validation on min length', () => {
    expect(validatePassword('passW0rd', { minLength: 12 })).toStrictEqual(false);
  });

  it('fails validation on types', () => {
    expect(validatePassword('passW0rd', { minLength: 8, numDifferentTypes: 4 })).toStrictEqual(
      false
    );
  });
});
