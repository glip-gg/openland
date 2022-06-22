import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import ModalContainer from './ModalContainer';
import ChipList from '../ui/chipList';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';
import Chip from '../ui/chip';
import FilterBottomTab from '../ui/FilterBottomTab';
import {
    Input, 
} from '@nextui-org/react';

import globalApeFilter from '../../utils/globalFilter';

const direction_data: Array<String> = ['All', 'S', 'W', 'E', 'N'];
const direction_chips = direction_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);

const tier_data: Array<String> = ['All', '1', '2', '3'];
const tier_chips = tier_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);

/*
   5 items to be filterd, need  getter and setter for all 5
   Using props.xyz instead of direct names because too many params :(
   Params:
   - sediment_tier
   - sediment
   - category
   - tier
   - enviorment
 */
const resource_data: Array<String> = ['All', "Whisper","Bonestone","Spikeweed","Lunarian","Lumileaf","Oblivion","Nether","Duskia","Runa","Coralia","Brimstone","Luster","Chlorocite","Psychosilk","Tantalite","Moldium","Petrified","Fossica","Luminite","Kinsoul","Durinia","Ragnarock","Stonecrop","Sulfirica","Fortuna","Glowpod","Steppesalt","Degradia","Mossmoon","Fragmentia","Amberskull","Omni","Hollowcine","Thermodite","Etheria","Bubonium","Gloomia","Opalia","Sporicite","Galactica","Shatterfrost","Tanglevine","Claymer","Slushia","Maltosia","Slaglia","Void","Scumbria","Element 115","Vaporhaze","Spiritseep","Nocturna","Nebula","Rotworth","Scholara","Prysmatica","Abyssia","Onyx","Aurelian","Magentia","Pyrum","Geopillar","Dimensional","Pricklia","Senticybia","Entropy","Mallo","Nucleod","Obsilica","Brineslime","Chroma","Entradium","Lapidite","Phantom"];


const RESOUCE_FILTER_LIST = [
    'Eastern Resource Tier', 'Eastern Resource',
    'Northern Resource Tier', 'Northern Resource',
    'Southern Resource Tier', 'Southern Resource',
    'Western Resource Tier', 'Western Resource',
]

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const RESOURCE_SHORTHAND_DICT:any  = {
    'N' : 'Northern Resource',
    'E' : 'Eastern Resource',
    'W' : 'Western Resource',
    'S' : 'Southern Resource'
};

const getResourceDirections = (resourceDirectionValues:any[])=>{
    let resourceDirections = []
    for(let resourceDirectValue of resourceDirectionValues){
        resourceDirections.push(RESOURCE_SHORTHAND_DICT[resourceDirectValue]);
    }
    return resourceDirections
}

export default function ResourceFilterModal(props: any) {
    const forceUpdate = useForceUpdate();
    const [filteredCards, setFilteredCards] = useState(resource_data);
    const [name, setName] = useState('');
    
    const clearFilters = () => {
        for(let resourceFilter of RESOUCE_FILTER_LIST){
            globalApeFilter.clearFilter(resourceFilter, 'in');
        }
        globalApeFilter.clearFilter('Resource Direction', 'in');
        globalApeFilter.clearFilter('Resource Tier', 'in');
        globalApeFilter.clearFilter('Resource Type', 'in');
        forceUpdate()
    };
    
    const setFilters = (name:string, val:string|number, active:boolean) => {
        for(let resourceFilter of RESOUCE_FILTER_LIST){
            globalApeFilter.clearFilter(resourceFilter, 'in');
        }
        let resourceDirectionFilter = globalApeFilter.getFilterValue(
            'Resource Direction', 'in');
        let resourceTierFilter = globalApeFilter.getFilterValue(
            'Resource Tier', 'in');
        let resourceTypeFilter = globalApeFilter.getFilterValue(
            'Resource Type', 'in');
        let resourceDirections = ['Northern', 'Western', 'Southern', 'Eastern']
        if(resourceDirectionFilter){
            resourceDirections = getResourceDirections(resourceDirectionFilter);
        }
        if(resourceTierFilter){
            for(let resourceDirection of resourceDirections){
                for(let resourceTier of resourceTierFilter){
                    globalApeFilter.addFilter(resourceDirection + ' Tier', [resourceTier], 'in')
                }
            }
        }
        if(resourceTypeFilter){
            for(let resourceDirection of resourceDirections){
                for(let resourceType of resourceTypeFilter){
                    globalApeFilter.addFilter(resourceDirection, [resourceType], 'in')
                }
            }
        }
    }
    
    const textFilter = (e: any) => {
        const keyword = e.target.value;
        
        if (keyword !== '') {
            const results = resource_data.filter((user) => {
                return user.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setFilteredCards(results);
        } else {
            setFilteredCards(resource_data);
            // If the text field is empty, show all users
        }
        
        setName(keyword);
    };
    
    const type_chips = filteredCards.map((item: any, index: any) => <Chip key={`resource-tier-chip-${item}`} title={item} active={false}/>);
    
    return (
        <ModalContainer>

          <FilterSectionTitle>Resources</FilterSectionTitle>

          <Input
              clearable
              onChange={textFilter}
              value={name}
              contentRightStyling={false}
              placeholder="Search"                
          />

          <FilterSectionTitle>Direction</FilterSectionTitle>
          <FlexWrapWrapper type={'chip'}>
            <ChipList data={direction_data}
                      mainElemName="Resource Direction"
                      setFiltersCB={setFilters}
            ></ChipList>
          </FlexWrapWrapper>
          <FilterSectionTitle>Tier</FilterSectionTitle>
          <FlexWrapWrapper type={'chip'}>
            <ChipList
                data={tier_data}
                mainElemName="Resource Tier"
                setFiltersCB={setFilters}
            >
              
            </ChipList>
          </FlexWrapWrapper>
          <FilterSectionTitle>Type</FilterSectionTitle>
          <FlexWrapWrapper type={'card'}>
            <ChipList data={filteredCards}
                      setFiltersCB={setFilters}
                      mainElemName="Resource Type"></ChipList>
          </FlexWrapWrapper>


          <FilterBottomTab clearFilters={clearFilters} />


        </ModalContainer>
    );
}
