import { getPageCategory, getPageName, sendEvent, trackLink, trackPageView } from './tracking';

describe('sendEvent', () => {
  let windowSpy: jest.SpyInstance;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('calls the dataLayer.push global with the event object', () => {
    const mockPush = jest.fn();

    windowSpy.mockImplementation(() => ({
      dataLayer: {
        push: mockPush,
      },
    }));

    const mockEvent = {
      event: 'loginSuccess',
    };

    sendEvent(mockEvent);

    expect(mockPush).toBeCalledTimes(1);
    expect(mockPush).toBeCalledWith(mockEvent);
  });

  it('does not error when window.dataLayer is not available', () => {
    windowSpy.mockImplementation(() => ({
      dataLayer: undefined,
    }));

    const mockEvent = {
      event: 'loginSuccess',
    };

    expect(() => sendEvent(mockEvent)).not.toThrow();
  });
});

describe('trackLink', () => {
  let windowSpy: jest.SpyInstance;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('calls the utag global with the event object', () => {
    const mockLink = jest.fn();

    windowSpy.mockImplementation(() => ({
      document: {
        title: 'some title',
      },
      utag: {
        link: mockLink,
      },
    }));

    const mockEvent = {
      eventType: 'some type',
      eventCategory: 'some category',
    };

    const snakeCaseMockEvent = {
      event_type: 'some type',
      event_category: 'some category',
    };

    trackLink(mockEvent);

    expect(mockLink).toBeCalledTimes(1);
    expect(mockLink).toBeCalledWith(snakeCaseMockEvent);
  });

  it('does not error when window.utag is not available', () => {
    windowSpy.mockImplementation(() => ({
      document: {
        title: 'some title',
      },
      utag: undefined,
    }));

    const mockEvent = {
      eventType: 'some type',
      eventCategory: 'some category',
    };

    expect(() => trackLink(mockEvent)).not.toThrow();
  });
});

describe('trackPageView', () => {
  let windowSpy;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('calls the utag global with the event object', () => {
    const mockView = jest.fn();

    windowSpy.mockImplementation(() => ({
      document: {
        title: 'some title',
      },
      utag: {
        view: mockView,
      },
    }));

    trackPageView('/ISA/summary/');

    expect(mockView).toBeCalledTimes(1);
  });

  it('does not error when window.utag is not available', () => {
    windowSpy.mockImplementation(() => ({
      document: {
        title: 'some title',
      },
      utag: undefined,
    }));

    expect(() => trackPageView('/ISA/summary/')).not.toThrow();
  });
});

describe('getPageName', () => {
  it('generates a page name from a 1 word pathname', () => {
    const expectedPageName = 'ISA';
    expect(getPageName('ISA')).toBe(expectedPageName);
    expect(getPageName('/ISA')).toBe(expectedPageName);
    expect(getPageName('ISA/')).toBe(expectedPageName);
    expect(getPageName('/ISA/')).toBe(expectedPageName);
  });

  it('generates a page name from a 2 word pathname', () => {
    const expectedPageName = 'ISA summary';
    expect(getPageName('/ISA/summary')).toBe(expectedPageName);
    expect(getPageName('/ISA/summary/')).toBe(expectedPageName);
    expect(getPageName('/ISA/summary/')).toBe(expectedPageName);
  });

  it('generates a page name from a multi word pathname', () => {
    expect(getPageName('/ISA/summary/something')).toBe('ISA summary something');
    expect(getPageName('/ISA/summary/something/')).toBe('ISA summary something');
    expect(getPageName('/ISA/summary/something/else')).toBe('ISA summary something else');
    expect(getPageName('/ISA/summary/something/else/')).toBe('ISA summary something else');
  });

  it('generates a page name from an empty pathname', () => {
    const expectedPageName = '';
    expect(getPageName('/')).toBe(expectedPageName);
    expect(getPageName('')).toBe(expectedPageName);
  });
});

describe('getPageCategory', () => {
  it('generates a page category from a single word pathname', () => {
    const expectedPageCategory = 'ISA';
    expect(getPageCategory('/ISA')).toBe(expectedPageCategory);
    expect(getPageCategory('/ISA/')).toBe(expectedPageCategory);
  });

  it('generates a page name from a 2 word pathname', () => {
    const expectedPageCategory = 'ISA';
    expect(getPageCategory('/ISA/summary')).toBe(expectedPageCategory);
    expect(getPageCategory('/ISA/summary/')).toBe(expectedPageCategory);
    expect(getPageCategory('/ISA/summary/')).toBe(expectedPageCategory);
  });

  it('generates a page category from a multi word pathname', () => {
    const expectedPageCategory = 'ISA';
    expect(getPageCategory('/ISA/summary/something')).toBe(expectedPageCategory);
    expect(getPageCategory('/ISA/summary/something/else')).toBe(expectedPageCategory);
  });

  it('generates a page category from an empty pathname', () => {
    const expectedPageName = '';
    expect(getPageCategory('/')).toBe(expectedPageName);
    expect(getPageCategory('')).toBe(expectedPageName);
  });
});
