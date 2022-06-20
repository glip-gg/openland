import React, { useEffect } from 'react';
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
import Drawer from '@mui/material/Drawer';
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

const FilterHeaderItem = styled.div`
    padding: 12px 14px;
    background:  ${props => props.active ? 'rgba(255, 255, 255, 0.06)': 'transparent'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FilterHeaderItemLabel = styled.div`
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
        marginTop: "75px",
        zIndex: "2 !important",
        width:'624px',
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

    const handleOpenFilterDrawer = () => {
        setOpenFilterDrawer(true);
      };

    const selectFilterHeadItem = (filterType: any) => {
        // setActiveFilterHeaderItem(filterType);
        //TODO add other stuff to handle filter selection
    }

    const [mapLandDetailsPosition, setMapLandDetailPosition] = useState([-1, 0, 0])
    const [selectedMapLand, setSelectedMapLand] = useState({
        id: -1,
        price: 0,
        name: '',
        rank: '',
        tier: 1,
        koda: true,
        resource: false,
        artifact: true
    })

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
                trigger="click"
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
        setSelectedMapLand({
            id: 1241,
            price: 2.41,
            name: 'Splinter - Cosmic Dream',
            rank: '58 top 100%',
            tier: 1,
            koda: true,
            resource: false,
            artifact: true
        })
    }
    return (
        <div className={styles.container}>
          <Head>
            <title>Openland | Suped-up search for Otherside</title>
            <meta
                name="description"
                content="Navigate the otherside in a blazing fast experience"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Navbar />

          <Container
                as="main"
                display="flex"
                direction="column"
                justify="center"
                alignItems="center"
                style={{ height: '100vh', margin: 0 }}
            >                
                <Map onLandClicked={onLandSelected}></Map>

                {mapLandDetailsPosition[0] != -1 &&  <div id="map-land-details" style={{
                    backgroundColor: 'black',
                    position: 'absolute', 
                    left:`${mapLandDetailsPosition[1] + 50}px`, 
                    top:`80px`,
                    visibility: mapLandDetailsPosition[0] != -1 ? 'visible' : 'hidden'}}>
                    
                        <OtherCard key={`othercard-${mapLandDetailsPosition[0]}`} 
                                    data={selectedMapLand} />
                </div>}

                <Button shadow onClick={() => handleOpenFilterDrawer()} style={{position: 'absolute', bottom: '0px'}}>Open Drawer</Button>
                
            </Container>

          <Drawer anchor={'left'}
                  open={openFilterDrawer}
                  variant={"persistent"}
                  classes={{
                      paper: classes.drawerPaper
                  }}
                  onClose={() => setOpenFilterDrawer(false)}>
            <div style={{display: 'flex', flexDirection:'column', height: '100%'}}>
              <div style={{background: '#000',
                           borderBottomWidth: 1,
                           display:'flex',
                           borderColor: 'rgba(44, 44, 44, 1)'}}>
                {filterHeader}                    
              </div>
              <div style={{background: 'rgba(0, 0, 0, 1)', height: '100%'}}>
                <div style={{background: 'black', padding: 32}}>
                  <FilterBody filters={['Buy Now', 'Anus Reaper']} />
                </div>
              </div>
            </div>
          </Drawer>

        </div>
       
    );
}
