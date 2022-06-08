import 'rsuite/dist/rsuite.min.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme } from '@nextui-org/react';
import {SSRProvider} from '@react-aria/ssr';

const darkTheme = createTheme({
  type: 'dark',
 
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <NextUIProvider theme={darkTheme}>
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  </NextUIProvider>  
  );
}

export default MyApp;