import dynamic from 'next/dynamic'
import {useEffect, useCallback} from 'react';
const Drawer = dynamic(import('@mui/material/Drawer').then(mod => mod), { ssr: false }) // disable ssr
//import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Popover, Whisper } from 'rsuite';

import FilterBody from '../components/filterTab/filterBody';
import { DefaultPopover } from '../components/filterModals/parent_popover';
import styled from 'styled-components';
import Image from 'next/image';


import LandImage from '../assets/filter/land.svg';
import ArtifactImage from '../assets/top_level_filter/artifacts.svg';
import KodaImage from '../assets/top_level_filter/koda.svg';
import ResourcesImage from '../assets/top_level_filter/resources.svg';
import RankImage from '../assets/top_level_filter/rank.svg';
import PriceImage from '../assets/top_level_filter/price.svg';


const mainFilterImageDict:any = {
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
  display: flex;
  align-items: center;
  color: #FFFFFF;
`;

const FilterHeaderItemImage = ({active, imageType}) => {
    if(imageType == 'land')
        return (<Image alt='land' src={LandImage} style={{color: active ? 'white': 'rgba(68, 68, 68, 1)', marginBottom: 0}} />);
    console.log('imageType', imageType);
    return (<Image alt='land' src={mainFilterImageDict[imageType]} style={{color: active ? 'white': 'rgba(68, 68, 68, 1)', marginBottom: 0}} />);
}

export default function FilterDrawerComponent(props:any){
    const classes = useStyles();
    const [activeFilterHeaderItem,
           setActiveFilterHeaderItem] = useState('');
    
    const selectFilterHeadItem = (filterType: any) => {
        // setActiveFilterHeaderItem(filterType);
        //TODO add other stuff to handle filter selection
    }

    const [filterTypes, setFilterTypes] = useState([
        {type: 'land', label: 'Land type'},
        {type: 'artifact', label: 'Artifact'},
        {type: 'koda', label: 'Koda'},
        {type: 'resource', label: 'Resource'},
        {type: 'rank', label: 'Rank'},
        {type: 'price', label: 'Price'},         
    ]);
    
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
                    //onClick={() => selectFilterHeadItem(item.type)}
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

    const [y, setY] = useState(window.scrollY);
    
    const handleNavigation = useCallback(
        (e:any) => {
            const window = e.currentTarget;
            if (y > window.scrollY) {
                console.log("scrolling up");
            } else if (y < window.scrollY) {
                console.log("scrolling down");
            }
            setY(window.scrollY);
        }, [y]
    );
    
    useEffect(() => {
        setY(window.scrollY);
        console.log('adding scroll listener');
        window.addEventListener("scroll", handleNavigation);
        
        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);
    
    return (
        <Drawer anchor={'left'}
            //open={openFilterDrawer}
                open={props.barActive}
                variant={"persistent"}
                classes={{paper: classes.drawerPaper}}
        >
            <div style={{display: 'flex', flexDirection:'column', height: '100%'}}>
                <div style={{background: '#000',
                             borderBottomWidth: 1,
                             display:'flex',
                             borderBottom: '1px solid rgba(44, 44, 44, 1)',
                             //    position: 'fixed',
                             //    zIndex: 12                           
                }}>
                    {filterHeader}                    
                </div>
                <div style={{background: 'rgba(0, 0, 0, 1)', height: '100%', overflow: 'hidden'}}>
                    <div style={{background: 'black', padding: 32, paddingRight: 0,}}>
                        <FilterBody />
                    </div>
                </div>
            </div>
        </Drawer>
    );
}
