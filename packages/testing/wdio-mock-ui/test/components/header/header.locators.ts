export const addCashBtn = () =>
  $(
    '[data-testid="add cash"]'
  )
export const investBtn = () =>
  $(
    '[data-testid="invest"]'
  )
export const investmentMenuBtn = () => $('div.MuiListItem-button')
export const investmentMenuLabel = () => $('.MuiListItem-button .MuiLink-underlineHover')
export const lifePlanMenuBtn = () =>
  $('div.MuiGrid-item:nth-child(2) > div:nth-of-type(1)> .MuiLink-button')
export const logoBtn = () => $('div[data-testid="header"] .MuiGrid-grid-xs-2 button')
export const myAccountsLoginBtn = () =>
  $('[data-testid="header-menu"] .MuiToolbar-regular .MuiButton-text')
export const myAccountsLoginText = () =>
  $('[data-testid="header-menu"] .MuiToolbar-regular .MuiButton-text .MuiButton-label')

//headings
export const h1Label = () =>
  $(
    '.MuiContainer-root.MuiContainer-disableGutters div div.MuiContainer-root.MuiContainer-disableGutters.MuiContainer-maxWidthLg div.MuiBox-root div h1.MuiTypography-root.MuiTypography-body1'
  )
export const h2Label = () =>
  $(
    '.MuiContainer-root.MuiContainer-disableGutters div:nth-child(1) div.MuiContainer-root.MuiContainer-disableGutters.MuiContainer-maxWidthLg div.MuiBox-root div > h2.MuiTypography-root.MuiTypography-body1'
  )
export const h4Label = () =>
  $(
    '.MuiContainer-root.MuiContainer-disableGutters div:nth-child(1) div.MuiContainer-root.MuiContainer-disableGutters.MuiContainer-maxWidthLg div.MuiBox-root div > h4.MuiTypography-root.MuiTypography-body1:nth-child(3)'
  )
