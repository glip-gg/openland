import { useEffect } from 'react';

import styled from 'styled-components';
import { useState } from 'react';
import SortingDropDown from './sortingDropDown';
import ChipFilterDisplay from './ChipFilterDisplay';
import { Spacer } from '@nextui-org/react';
import OtherCard from './OtherCard';
import eventBus from '../../utils/eventBus';
import globalApeFilter from '../../utils/globalFilter';
import {PaginatedList} from  'react-paginated-list';
import { setFocusedIds, setLandData } from '../map/Map';

const FilterTitle = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 90.1%;
    /* or 25px */

    text-transform: uppercase;

    color: #FFFFFF;
`;

const Floor = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: rgba(255, 255, 255, 0.4);   
`;

const PaginatedListContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`

const oldCardData =  [{
    id: 1241,
    price: 2.41,
    name: 'Splinter - Cosmic Dream',
    rank: '58 top 100%',
    tier: 1,
    koda: true,
    resource: false,
    artifact: true
}, {
        id: 1241,
        price: 2.41,
        name: 'Splinter - Cosmic Dream',
        rank: '58 top 100%',
        tier: 1,
        koda: true,
        resource: false,
        artifact: true
    }, {
        id: 1241,
        price: 2.41,
        name: 'Splinter - Cosmic Dream',
        rank: '58 top 100%',
        tier: 1,
        koda: true,
        resource: false,
        artifact: true
}]
export default function FilterBody({filters, }: any) {

    const [cards, setCards] = useState([]);
    const [lands, setLands] = useState(4500);
    const [floor, setFloor] = useState(1.3);
    
    useEffect(()=>{
        let newData:any;
        eventBus.on("filter-applied", async (data:any)=>{
            newData = await globalApeFilter.applyFilter();
            console.log('newData', newData);
            setCards(newData);
            setLands(newData.length)
            if(newData.length === 1000000){
                //return
            }
            let newIds = newData.map((x:any)=>(x.Plot))
            console.log('newIds', newIds)
            setFocusedIds(newIds)
            
        });
        eventBus.on("ape-deeds-added", async (data:any)=>{
            newData = globalApeFilter.getAllApeDeeds();
            console.log('newData', newData);
            let ranks = newData.map((x:any)=>(x.rank))
            let envTiers = newData.map((x:any)=>(x['Environment Tier']))
            console.log('ranks', ranks);
            console.log('envTiers', envTiers);
            setLandData(ranks, envTiers);
            setLands(newData.length)
            setCards(newData);
        });

        return ()=>{
            eventBus.remove("filter-applied", undefined);
            eventBus.remove("ape-deeds-added", undefined);
        }
    },[]);
    

    return (
        <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', overflow: 'hidden'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', }}>
        <FilterTitle>{lands} LANDS</FilterTitle>
        {/*
            <SortingDropDown  />
          */}
        </div>
        {/*
            <Floor>Floor: {floor} eth</Floor>
          */}
        <Spacer />
        <ChipFilterDisplay rounded filters={filters} />
        <PaginatedList
            list={cards}
            itemsPerPage={6}
            loopAround={true}
            PaginatedListContainer={PaginatedListContainer}
            renderList={(list) => (
                <>
                  {list.map((item, id) => {
                      return (
                          <OtherCard key={`othercard-${id}`} data={item} />
                      );
                  })}
                </>
            )}
        />
        <Spacer y={4} />
        </div>
    );
}
