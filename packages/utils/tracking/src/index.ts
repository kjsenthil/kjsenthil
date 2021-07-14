declare global {
  interface Window {
    dataLayer?: any[];
    utag?: {
      link?: (value: Record<string, unknown>) => void;
      view?: (value: Record<string, unknown>) => void;
    };
    utag_data?: Record<string, unknown>;
  }
}

export { sendEvent, trackLink, trackPageView } from './tracking';
