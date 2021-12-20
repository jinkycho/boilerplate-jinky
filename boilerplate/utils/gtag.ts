// lib/gtag.js

declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

interface Event {
  action: any;
  category: string;
  label: string;
  value: any;
}

export const GA_TRACKING_ID = "G-3W7VWSF6S0";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
    title: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: Event) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
