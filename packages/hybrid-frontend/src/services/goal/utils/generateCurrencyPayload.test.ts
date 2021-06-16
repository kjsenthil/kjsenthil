import generateDatePayload from './generateDatePayload';

describe('generateDatePayload', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2021-06-01').getTime());
  });

  it('renders a partial payload object provided date', () => {
    expect(generateDatePayload('2021-07-01')).toMatchInlineSnapshot(`
      Object {
        "_type": "Date",
        "_val": "2021-07-01",
      }
    `);
  });

  it('renders an partial payload object with todays date', () => {
    expect(generateDatePayload()).toMatchInlineSnapshot(`
      Object {
        "_type": "Date",
        "_val": "2021-06-01",
      }
    `);
  });
});
