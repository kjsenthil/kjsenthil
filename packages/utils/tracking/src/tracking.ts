import snakecaseKeys from 'snakecase-keys';

/**
 * Generate a page name for view events using the location pathname by:
 * 1. removing leading and trailing backslash characters
 * 2. replacing other backslash characters with spaces
 */
export const getPageName = (pathname: string): string =>
  pathname.replace(/^\/|\/$/g, '').replace(/\//g, ' ');

/**
 * Generate a page category for view events using the location pathname by
 * matching all characters between the first and second backslash characters
 */
export const getPageCategory = (pathname: string): string =>
  pathname.replace(/^\/([^/]*).*$/, '$1');

/**
 * Google Tag Manager functions
 */
export const sendEvent = (event: Record<string, unknown>): void => {
  if (window.dataLayer && typeof window.dataLayer.push === 'function') {
    window.dataLayer.push(event);
  }
};

/**
 * Tealium functions
 */
export const trackLink = (event: Record<string, unknown>): void => {
  if (window.utag && typeof window.utag.link === 'function') {
    window.utag.link({ ...snakecaseKeys(event) });
  }
};

export const trackPageView = (pathname: string): void => {
  if (window.utag && typeof window.utag.view === 'function') {
    window.utag.view({
      brand_name: 'digital-hybrid',
      page_name: getPageName(pathname),
      page_title: window.document.title,
      page_category: getPageCategory(pathname),
      page_url: pathname,
    });
  }
};
