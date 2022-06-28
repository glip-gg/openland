import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Tag } from "rsuite";

import eventBus from '../../utils/eventBus';
import globalApeFilter from '../../utils/globalFilter';
import {clearLandFilters} from '../filterModals/land';
import {clearArtifactFilters} from '../filterModals/artifact';
import { clearKodaFilters } from '../filterModals/koda';
import {clearResourceFilters} from '../filterModals/resource';
import {clearRankFilters} from '../filterModals/rank';
import {clearPriceFilters} from '../filterModals/price';

const Clear = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #FFFFFF;
    margin-left: 22px;
    cursor: pointer;
`;

const LAND_FILTERS = ["Sediment Tier", "Sediment", "Category", "Environment Tier", "Environment"];
const ARTIFACT_FILTERS = ["Artifact"];
const KODA_FILTERS = ["Koda"];
const RESOURCE_FILTERS = [
    'Eastern Resource Tier', 'Eastern Resource',
    'Northern Resource Tier', 'Northern Resource',
    'Southern Resource Tier', 'Southern Resource',
    'Western Resource Tier', 'Western Resource',
    'Resource Tiers', 'Resource Types'
];
const RANK_FILTERS = [
    'rank'
];
const PRICE_FILTERS = [
    'currentListPrice'
];

const DISPLAY_NAME_DICT:any = {
    landFilters: 'Land Filters',
    artifactFilters: 'Artifact Filters',
    kodaFilters: 'Koda Filters',
    resourceFilters: 'Resource Filters',
    rankFilters: 'Rank Filters',
    priceFilters: 'Price Filters'
};

export default function ChipFilterDisplay({filters}: any) {    

    const [appliedFilters, setAppliedFilters] = useState({} as any);
    
    const newFiltersAdded = async (data:any)=>{
        //need to check if filters exist in filters map.
        console.log('filters applied', data);
        data = globalApeFilter.filters;
        let landFilters = 0;
        let artifactFilters = 0;
        let kodaFilters = 0;
        let resourceFilters = 0;
        let rankFilters = 0;
        let priceFilters = 0;
        for(let key of Object.keys(data)){
            let name = data[key].name;
            console.log('keykey', key);
            if(LAND_FILTERS.includes(name)){
                landFilters+=data[key].valArr.length
                console.log('land filter yaayyyyayya')
            }
            if(ARTIFACT_FILTERS.includes(name)){
                artifactFilters+=data[key].valArr.length
            }
            if(KODA_FILTERS.includes(name)){
                kodaFilters +=data[key].valArr.length;
            }
            if(RESOURCE_FILTERS.includes(name)){
                resourceFilters +=data[key].valArr.length;
            }
            if(RANK_FILTERS.includes(name)){
                rankFilters +=data[key].valArr.length;
            }
            if(PRICE_FILTERS.includes(name)){
                priceFilters +=data[key].valArr.length;
            }
        }
        setAppliedFilters({
            landFilters: landFilters,
            artifactFilters: artifactFilters,
            kodaFilters: kodaFilters,
            resourceFilters: resourceFilters,
            rankFilters: rankFilters,
            priceFilters: priceFilters            
        });
    }
    const clearAllFilters = ()=>{
        clearLandFilters();
        clearArtifactFilters();
        clearKodaFilters();
        clearResourceFilters();
        clearRankFilters();
        clearPriceFilters();
        eventBus.dispatch('filter-applied',{});
    }
    
    useEffect(()=>{
        let newData:any;
        eventBus.on("filter-applied", newFiltersAdded);
        return ()=>{
            eventBus.remove("filter-applied", newFiltersAdded);
        }
    },[]);

    
    const filterClosed = (item: any) => {
        if(item === 'landFilters'){
            console.log('sad closing land filters');
            clearLandFilters();
        }
        if(item === 'artifactFilters'){
            console.log('sad closing land filters');
            clearArtifactFilters();
        }
        if(item === 'kodaFilters'){
            console.log('sad closing land filters');
            clearKodaFilters();
        }
        if(item === 'resourceFilters'){
            console.log('sad closing land filters');
            clearResourceFilters();
        }
        if(item === 'rankFilters'){
            console.log('sad closing land filters');
            clearRankFilters();
        }
        if(item === 'priceFilters'){
            console.log('sad closing land filters');
            clearPriceFilters();
        }
        eventBus.dispatch('filter-applied',{});
    };
    
    const chipItems = Object.keys(appliedFilters).filter((item:any)=>{
        if(appliedFilters[item]){
            return true;
        }
        return false;
    }).map((item: any, index: any) => (
        <Tag
            style={{
                margin: 9,
                borderRadius: 100,
                background: '#191919',
                color: '#fff',
                padding: '8px 26px',
                cursor: 'pointer'
            }} size="lg"
            onClick={(ev:any)=>{console.log(ev)}}
            key={`sortingdropdown-${index}`} closable
            onClose={(ev) => {filterClosed(item);ev.stopPropagation();ev.preventDefault()}}
        >{DISPLAY_NAME_DICT[item]} ({appliedFilters[item]})</Tag> ));
    
    console.log('chip items', chipItems);
    return (
        <div style={{display: 'flex', flexGrow: 'grow'}}>
            {chipItems}
            {chipItems.length > 0 && <Clear onClick={()=> {clearAllFilters()}}>Clear all filters</Clear>}
        </div>
    );
}
