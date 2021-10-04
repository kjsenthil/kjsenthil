import validateEmail from './validateEmail';

describe('validateEmail', () => {
  it('returns a valid email', () => {
    expect(validateEmail('test@test.com', {})).toStrictEqual(true);
  });

  it('returns an invalid email', () => {
    expect(validateEmail('test@test', {})).toStrictEqual(false);
  });

  it('returns an invalid email if not standard length', () => {
    expect(
      validateEmail(
        'reallylongemailaddressreallylongemailaddressreallylongemailaddressreallylongemailaddress@test.com',
        { ignoreMaxLength: false }
      )
    ).toStrictEqual(false);
  });

  it('returns an valid email if does not contain blacklisted characters', () => {
    expect(validateEmail('test@test.com', { blacklistedChars: '$9p' })).toStrictEqual(true);
  });

  it('returns an invalid email if contains blacklisted characters', () => {
    expect(validateEmail('testp9test@test.com', { blacklistedChars: '$9p' })).toStrictEqual(false);
  });
});
