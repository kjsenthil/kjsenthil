// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface SimplePaletteColorOptions {
    light1?: string;
    light2?: string;
    dark1?: string;
    dark2?: string;
  }

  interface PaletteColor {
    light1?: string;
    light2?: string;
    dark1?: string;
    dark2?: string;
  }

  interface TypeBackground {
    layout: string;
  }

  interface Palette {
    tertiary: SimplePaletteColorOptions;
    grey: SimplePaletteColorOptions;
    gold: SimplePaletteColorOptions;
  }

  interface PaletteOptions {
    tertiary: SimplePaletteColorOptions;
    grey: SimplePaletteColorOptions;
    gold: SimplePaletteColorOptions;
  }
}
