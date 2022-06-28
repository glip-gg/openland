import { useEffect } from 'react';

import styled from 'styled-components';
import { useState } from 'react';
import SortingDropDown from './sortingDropDown';
import ChipFilterDisplay from './ChipFilterDisplay';
import { Spacer } from '@nextui-org/react';
import OtherCard from './OtherCard';
import eventBus from '../../utils/eventBus';
import globalApeFilter from '../../utils/globalFilter';
import { sortApeDeeds, SORTING_OPTION_PRICE_LOW_TO_HIGH, SORTING_OPTIONS } from '../../utils/apeDeedsModelManager';
import {PaginatedList} from  'react-paginated-list';
import { setFilteredIds, setLandData } from '../map/Map';

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
}];


export const DEFAULT_SORTING_OPTION = SORTING_OPTIONS[0];

export default function FilterBody({filters, }: any) {

    const [cards, setCards] = useState([] as any[]);
    const [sortingOption, setSortingOption] = useState(DEFAULT_SORTING_OPTION);
    const [lands, setLands] = useState(4500);
    
    useEffect(()=>{
        let newData:any;
        eventBus.on("filter-applied", async (data:any)=>{
            newData = await globalApeFilter.applyFilter();
            console.log('newData', newData);
            setCards(sortApeDeeds(Object.keys(sortingOption)[0], newData));
            setLands(newData.length)
            if(newData.length === 1000000){
                //return
            }
            let newIds = newData.map((x:any)=>(x.Plot))
            console.log('newIds', newIds)
            setFilteredIds(newIds);
            
        });
        return ()=>{
            eventBus.remove("filter-applied", undefined);
            eventBus.remove("ape-deeds-added", undefined);
        }
    },[]);

    useEffect(()=>{
        let newData = globalApeFilter.getAllApeDeeds();
        console.log('newData', newData);
        let ranks = newData.map((x:any)=>(x.rank))
        let envTiers = newData.map((x:any)=>(x['Environment Tier']))
        console.log('ranks', ranks);
        console.log('envTiers', envTiers);
        setLandData(ranks, envTiers);
        setLands(newData.length)
        setCards(sortApeDeeds(Object.keys(sortingOption)[0], newData));
    },[]);
    
    const sortingOptionChanged = (sortingOption:any) =>{
        setSortingOption(sortingOption);
        setCards(sortApeDeeds(Object.keys(sortingOption)[0], cards));
        
    }
    return (
        <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', overflow: 'hidden'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', }}>
            <FilterTitle>{lands} LANDS</FilterTitle>
            <SortingDropDown  sortingOption={sortingOption} setSortingOption={sortingOptionChanged} />
          </div>
          <Spacer />
          <ChipFilterDisplay rounded filters={filters} />
          <PaginatedList
              list={cards}
              itemsPerPage={6}
              loopAround={true}
              renderList={(list) => (
                  <PaginatedListContainer>
                    {list.map((item, id) => {
                        return (
                            <OtherCard key={`othercard-${id}`} data={item} />
                        );
                    })}
                  </PaginatedListContainer>
              )}
          />
          <Spacer y={4} />
        </div>
    );
}
