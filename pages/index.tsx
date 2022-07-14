import React, { useEffect } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
  Container,
} from '@nextui-org/react';
import Navbar from '../components/Navbar';
import { useState } from 'react';

//import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';

import styled from 'styled-components';


import Map from '../components/map/Map'
import OtherCard from '../components/filterTab/OtherCard';
import FilterDrawerComponent from '../components/FilterDrawerComponent';
import {getLandData} from '../utils/apeDeedsModelManager';


import { fetchApeDeedsData, fetchApeDeedsPriceData, fetchApeDeedsFloorData } from '../utils/dataFetcherHelper';
import { addApeDeeds } from '../utils/apeDeedsModelManager';
import logo from '../assets/logo.svg';



const Desktop = styled.div`
  display: none;
  @media (min-device-width: 481px) {
    display: flex;
    flex-direction: column;
    /* height: 100vh; */
    height: 100%;
    /* overflow: hidden; */
  }
`;

const Mobile = styled.div`
  display: none;
  @media only screen and (max-device-width: 480px) {
  display: flex;
  flex-direction: column;
  }
`;

const Title = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 600;
    font-size: 24.0705px;
    line-height: 100%;
    /* identical to box height, or 24px */
    letter-spacing: -0.05em;
    margin-top: 14px;
    color: #FFFFFF;
`;

const WhiteButton = styled.a`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;

    background: #FFFFFF;
    border-radius: 8px;
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #000000;
`;

const ATag = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: #FFFFFF;

    opacity: 0.6;
`;

const Heading = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 90.1%;
    /* or 29px */

    text-transform: uppercase;

    color: #FFFFFF;
    margin: 24px 0px;
`;

const Floor = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 90.1%;
    /* or 31px */

    text-align: left;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 24px;
`;

const FloorTitle = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    margin-top: 22px;
    margin-bottom: 16px;
`;


const useStyles = makeStyles({
    drawerPaper: {
        marginTop: "71px",
        zIndex: "2!important",
        width: '624px',
        backgroundColor: 'transparent!important',
        border: 'none',
    }
});



export default function Home() {
    const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [barActive, setBarActive] = useState(true);
    
    const [floor, setFloor] = useState(0);
    
    const classes = useStyles();

    const [check, setCheck] = useState(false);
    
    

    useEffect(() => {
        const getFloorPrice = async () => {
            const data: any = await fetchApeDeedsFloorData();
            console.log(data, 'floordata')
            setFloor(data.data.floorPrice);
        }
        getFloorPrice();
    }, []);

    const selectFilterHeadItem = (filterType: any) => {
        // setActiveFilterHeaderItem(filterType);
        //TODO add other stuff to handle filter selection
    }

    const [mapLandDetailsPosition, setMapLandDetailPosition] = useState([-1, 0, 0])
    const [selectedMapLand, setSelectedMapLand] = useState({})
    

    const onLandSelected = (index: number, x: number, y: number) => {
        console.log('land clicked parent: ', index, x, y)
        setMapLandDetailPosition([index, x, y])
        let landData = getLandData(index);
        setSelectedMapLand(landData);
    }

    const onLandUnselected = () => {
        setMapLandDetailPosition([-1, 0, 0])
    }

    useEffect(()=>{
        (async () =>{
            //TODO do not load this on mobile
            //let apeDeeds = await fetchApeDeedsData();
            let apeDeeds = fetchApeDeedsData();
            let apePriceData = fetchApeDeedsPriceData();
            apeDeeds = await apeDeeds;
            apePriceData = await apePriceData;
            //let apePriceData = await fetchPriceData();
            addApeDeeds(apeDeeds, apePriceData.data.otherdeed);
            setDataLoaded(true);
        })();
    },[]);

    if(!dataLoaded){
    //if(true){
        return (
            <div style={{display:'flex', width:'100%', height:'100vh', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
              {/* <BallTriangle ariaLabel="loading-indicator" color="white" width="400" height="500" /> */}
              {/* <div className="shsimmer" style={{color:'white', fontSize: 66}}>
                Loading!
              </div> */}
              <div className='loader'></div>
            </div>
        );
    }
    
    return (
        <div className={styles.container}>
            <Head>
            <title>OpenLand | Suped-up search for Otherside</title>
            <meta
                name="description"
                content="Navigate the otherside in a blazing fast experience"
            />
            <link rel="icon" href="/favicon.ico" />

            </Head>          

            <Desktop>
                <Navbar showSearch={true} showFloor={true} barActive={barActive} setBarActive={setBarActive} />

                <Container
                    as="main"
                    display="flex"
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ height: '100vh', margin: 0 }}
                >                
                    <Map onLandSelected={onLandSelected} onLandUnselected={onLandUnselected}></Map>

                    {mapLandDetailsPosition[0] != -1 &&  <div id="map-land-details" style={{
                        padding: 20,
                        backgroundColor: 'black',
                        position: 'absolute', 
                        left:`${mapLandDetailsPosition[1]}px`, 
                        top:`${mapLandDetailsPosition[2]}px`,
                        visibility: mapLandDetailsPosition[0] != -1 ? 'visible' : 'hidden'}}>
                        
                        <OtherCard key={`othercard-${mapLandDetailsPosition[0]}`} 
                                   data={selectedMapLand} />
                    </div>}
                    {/*
                        <Button shadow onClick={() => handleOpenFilterDrawer()} style={{position: 'absolute', bottom: '0px'}}>Open Drawer</Button>
                      */}
                    
                </Container>
                <FilterDrawerComponent barActive={barActive}>
                </FilterDrawerComponent>

            </Desktop>

            <Mobile>
                <div style={{paddingTop: 12, paddingLeft: 24, background: 'linear-gradient(119.74deg, #1E1E1E 31.82%, #1F1F1F 122.39%)', display: 'flex', justifyContent: 'flex-end'}}>
                    <Image width={375} height={234} alt='desktop-smaple-image' src='https://openland.s3.us-east-2.amazonaws.com/desktop.png' />
                </div>
                <div style={{padding: 28}}>
                    <div style={{display: 'flex', }}>
                        <Image alt='logo' src={logo} />
                        {/* <Title style={{marginLeft: 8}}>OpenLand</Title> */}
                    </div>
                    <div>
                        <Heading>explore the otherside map in airbnb-like way</Heading>

                        <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: 28}}>
                            <WhiteButton href='https://discord.gg/ESHQtDxpyS'>JOIN DISCORD</WhiteButton>
                            <ATag>MOBILE COMING SOON</ATag>
                        </div>
                        <FloorTitle>Otherside floor</FloorTitle>
                        <Floor>{floor}Ξ</Floor>
                    </div>
                </div>
            </Mobile>
            

        </div>
        
    );
}
