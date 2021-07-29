import { setTheme } from '@tsw/test-util';
import '@testing-library/jest-dom/extend-expect';
import theme from '../src/themes/mui';
import 'jest-styled-components';

jest.mock('../src/assets/fonts', () => ({}));
jest.mock('../src/components/particles/Counter', () =>
  jest.requireActual('../src/components/particles/Counter/__mocks__/Counter')
);

setTheme(theme);
