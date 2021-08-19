import '@testing-library/jest-dom/extend-expect';
import theme from '../../react-components/src/themes/mui';
import 'jest-styled-components';
import { setTheme } from '../../utils/test';

jest.mock('../../react-components/src/assets/fonts', () => ({}));
jest.mock('../../react-components/src/components/particles/Counter', () =>
  jest.requireActual('../../react-components/src/components/particles/Counter/__mocks__/Counter')
);

setTheme(theme);
