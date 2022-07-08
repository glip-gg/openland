import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { NextUIProvider, createTheme } from '@nextui-org/react';
import {SSRProvider} from '@react-aria/ssr';
import { GoogleAnalytics, usePageViews, event } from "nextjs-google-analytics";

import 'rsuite/dist/rsuite.min.css';
import '../styles/globals.css'

const darkTheme = createTheme({
  type: 'dark',
});

export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric) {
  event(name, {
    category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}


function MyApp({ Component, pageProps }: AppProps) {
  usePageViews();
  
  
  return (
    <NextUIProvider theme={darkTheme}>
      <SSRProvider>
        <GoogleAnalytics />
        <Component {...pageProps} />
      </SSRProvider>
    </NextUIProvider>  
  );
}

export default MyApp;
