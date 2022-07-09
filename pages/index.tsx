import React, { useEffect } from 'react';
import dynamic from 'next/dynamic'
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
  Container,
  Button,
  Input,
  Spacer,
  Text,
  Link
} from '@nextui-org/react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { Popover, Whisper } from 'rsuite'
const Drawer = dynamic(import('@mui/material/Drawer').then(mod => mod), { ssr: false }) // disable ssr



//import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';

import styled from 'styled-components';
import FilterBody from '../components/filterTab/filterBody';

import SortingDropDown from '../components/filterTab/sortingDropDown';
import { DefaultPopover } from '../components/filterModals/parent_popover';

import LandImage from '../assets/filter/land.svg';
import ArtifactImage from '../assets/top_level_filter/artifacts.svg';
import KodaImage from '../assets/top_level_filter/koda.svg';
import ResourcesImage from '../assets/top_level_filter/resources.svg';
import RankImage from '../assets/top_level_filter/rank.svg';
import PriceImage from '../assets/top_level_filter/price.svg';


import Map from '../components/map/Map'
import OtherCard from '../components/filterTab/OtherCard';
import {getLandData} from '../utils/apeDeedsModelManager';


import { fetchApeDeedsData, fetchApeDeedsPriceData, fetchApeDeedsFloorData } from '../utils/dataFetcherHelper';
import { addApeDeeds } from '../utils/apeDeedsModelManager';
import { BallTriangle } from 'react-loader-spinner'
import logo from '../assets/logo.svg';


let FilterHeaderItem = styled.div`
    padding: 12px 14px;
    background:  ${props => props.active ? 'rgba(255, 255, 255, 0.06)': 'transparent'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

let FilterHeaderItemLabel = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */
    display: flex;
    align-items: center;
    color: #FFFFFF;
`;

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

const mainFilterImageDict = {
    'land': LandImage,
    'artifact': ArtifactImage,
    'koda': KodaImage,
    'resource': ResourcesImage,
    'rank': RankImage,
    'price': PriceImage
}

const useStyles = makeStyles({
    drawerPaper: {
        marginTop: "71px",
        zIndex: "2!important",
        width: '624px',
        backgroundColor: 'transparent!important',
        border: 'none',
    }
});


const FilterHeaderItemImage = ({active, imageType}) => {
    if(imageType == 'land')
        return (<Image alt='land' src={LandImage} style={{color: active ? 'white': 'rgba(68, 68, 68, 1)', marginBottom: 0}} />);
    console.log('imageType', imageType);
    return (<Image alt='land' src={mainFilterImageDict[imageType]} style={{color: active ? 'white': 'rgba(68, 68, 68, 1)', marginBottom: 0}} />);
}

export default function Home() {
    const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [barActive, setBarActive] = useState(true);
    
    const [floor, setFloor] = useState(0);
    
    const classes = useStyles();

    const [check, setCheck] = useState(false);
    const [filterTypes, setFilterTypes] = useState([
        {type: 'land', label: 'Land type'},
        {type: 'artifact', label: 'Artifact'},
        {type: 'koda', label: 'Koda'},
        {type: 'resource', label: 'Resource'},
        {type: 'rank', label: 'Rank'},
        {type: 'price', label: 'Price'},         
    ]);
    const [activeFilterHeaderItem, setActiveFilterHeaderItem] = useState('');

    useEffect(() => {
        const getFloorPrice = async () => {
            const data: any = await fetchApeDeedsFloorData();
            console.log(data, 'floordata')
            setFloor(data.data.floorPrice);
        }
        getFloorPrice();
    }, []);

    const handleOpenFilterDrawer = () => {
        setOpenFilterDrawer(true);
      };

    const selectFilterHeadItem = (filterType: any) => {
        // setActiveFilterHeaderItem(filterType);
        //TODO add other stuff to handle filter selection
    }

    const [mapLandDetailsPosition, setMapLandDetailPosition] = useState([-1, 0, 0])
    const [selectedMapLand, setSelectedMapLand] = useState({})
    

    const filterHeader: any = filterTypes.map((item, index) => {        
        let placement: string = 'bottomStart';
        if(item.type == 'land') placement = 'bottomStart';
        if(item.type == 'artifact') placement = 'bottomStart';
        if(item.type == 'koda') placement = 'bottomStart';
        if(item.type == 'resource') placement = 'bottomStart';
        if(item.type == 'price') placement = 'bottomEnd';
        if(item.type == 'rank') placement = 'bottomEnd';
        
        return (
            <Whisper
                key={`filter-header-item-${index}`}
                trigger="hover"
                placement={placement}
                controlId={`control-id-${placement}`}
                enterable
                speaker={(                
                    <DefaultPopover type={item.type} title={item.label}/>
                )}
            >
                <FilterHeaderItem
                        onClick={() => selectFilterHeadItem(item.type)}
                        className='hover filter-header-item'                        
                        active={activeFilterHeaderItem == item.type}
                        style={{minWidth: 104}}
                        // onMouseEnter={() => console.log('asdff')}
                        // onMouseLeave={() => console.log('laeve')}
                        >
                        <FilterHeaderItemImage active={activeFilterHeaderItem == item.type} imageType={item.type} />
                        <FilterHeaderItemLabel style={{color: '#fff', marginTop: 10}}>{item.label}</FilterHeaderItemLabel>
                    </FilterHeaderItem>
            </Whisper>
            
        );
    });

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
            let [apeDeeds, apePriceData] = await Promise.all([
                fetchApeDeedsData(), fetchApeDeedsPriceData()]);
            
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
              <div className="shsimmer" style={{color:'white', fontSize: 66}}>
                Loading!
              </div>
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

            <Drawer anchor={'left'}
              //open={openFilterDrawer}
                    open={barActive}
                    variant={"persistent"}
                    classes={{paper: classes.drawerPaper}}
                    onClose={() => setOpenFilterDrawer(false)}>
              <div style={{display: 'flex', flexDirection:'column', height: '100%'}}>
                <div style={{background: '#000',
                             borderBottomWidth: 1,
                             display:'flex',
                             borderColor: 'rgba(44, 44, 44, 1)',
                             //    position: 'fixed',
                             //    zIndex: 12                           
                }}>
                  {filterHeader}                    
                </div>
                <div style={{background: 'rgba(0, 0, 0, 1)', height: '100%', overflow: 'hidden'}}>
                  <div style={{background: 'black', padding: 32, paddingRight: 0,}}>
                    <FilterBody filters={[]} />
                  </div>
                </div>
              </div>
            </Drawer>
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
