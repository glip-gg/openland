import { useEffect } from 'react'

import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme } from '@nextui-org/react';
import {SSRProvider} from '@react-aria/ssr';

import 'rsuite/dist/rsuite.min.css';
import '../styles/globals.css'

import { fetchApeDeedsData, fetchApeDeedsPriceData } from '../utils/dataFetherHelper';
import { addApeDeeds } from '../utils/apeDeedsModelManager';

const darkTheme = createTheme({
  type: 'dark',
});

function MyApp({ Component, pageProps }: AppProps) {
  
  useEffect(()=>{
    (async () =>{
        //let apeDeeds = await fetchApeDeedsData();
        let [apeDeeds, apePriceData] = await Promise.all([
            fetchApeDeedsData(), fetchApeDeedsPriceData()]);

        //let apePriceData = await fetchPriceData();
        addApeDeeds(apeDeeds, apePriceData);
    })();
  },[]);
  
  return (
    <NextUIProvider theme={darkTheme}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </NextUIProvider>  
  );
}

export default MyApp;
