declare interface Window {
  utag?: {
    link?: (value: Record<string, unknown>) => void;
    view?: (value: Record<string, unknown>) => void;
  };
  utag_data?: Record<string, unknown>;
}
