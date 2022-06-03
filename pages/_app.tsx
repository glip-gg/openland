import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import {SSRProvider} from '@react-aria/ssr';


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <NextUIProvider>
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  </NextUIProvider>  
  );
}

export default MyApp;