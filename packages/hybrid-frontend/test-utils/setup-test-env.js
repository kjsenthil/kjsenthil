import { setTheme } from '@tsw/test-util';
import '@testing-library/jest-dom/extend-expect';
import theme from '../src/themes/mui';

jest.mock('../src/assets/fonts', () => ({}));

setTheme(theme);
