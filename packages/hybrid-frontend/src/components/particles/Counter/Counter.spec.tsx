import * as React from 'react';
import { renderWithTheme } from '@tsw/test-util';

import Counter from './Counter';

jest.unmock('./Counter');

const formatter = (num: number) => String(num);

describe('Counter', () => {
  it('renders correctly ', () => {
    const { result } = renderWithTheme(<Counter value={10000} valueFormatter={formatter} />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div>
          0
        </div>
      </div>
    `);
  });
});
