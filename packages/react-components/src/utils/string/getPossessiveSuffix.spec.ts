import getPossessiveSuffix from './getPossessiveSuffix';

describe('getPossessiveSuffix', () => {
  it('returns an apostrophe when the noun ends with s', () => {
    expect(getPossessiveSuffix('Thomas')).toStrictEqual("'");
  });

  it("returns 's when the noun does not end with an s ", () => {
    expect(getPossessiveSuffix('Tom')).toStrictEqual("'s");
  });
});
