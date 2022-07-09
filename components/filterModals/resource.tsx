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
import eventBus from '../../utils/eventBus';
import { event } from "nextjs-google-analytics";
import {applyFilterGlobal} from '../../utils/util';

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

const resource_data: Array<String> = [
    'All',          'Abyssia',     'Amberskull', 'Aurelian',
    'Bonestone',    'Brimstone',   'Brineslime', 'Bubonium',
    'Chlorocite',   'Chroma',      'Claymer',    'Coralia',
    'Degradia',     'Dimensional', 'Durinia',    'Duskia',
    'Element 115',  'Entradium',   'Entropy',    'Etheria',
    'Fortuna',      'Fossica',     'Fragmentia', 'Galactica',
    'Geopillar',    'Gloomia',     'Glowpod',    'Hollowcine',
    'Kinsoul',      'Lapidite',    'Lumileaf',   'Luminite',
    'Lunarian',     'Luster',      'Magentia',   'Mallo',
    'Maltosia',     'Moldium',     'Mossmoon',   'Nebula',
    'Nether',       'Nocturna',    'Nucleod',    'Oblivion',
    'Obsilica',     'Omni',        'Onyx',       'Opalia',
    'Petrified',    'Phantom',     'Pricklia',   'Prysmatica',
    'Psychosilk',   'Pyrum',       'Ragnarock',  'Rotworth',
    'Runa',         'Scholara',    'Scumbria',   'Senticybia',
    'Shatterfrost', 'Slaglia',     'Slushia',    'Spikeweed',
    'Spiritseep',   'Sporicite',   'Steppesalt', 'Stonecrop',
    'Sulfirica',    'Tanglevine',  'Tantalite',  'Thermodite',
    'Vaporhaze',    'Void',        'Whisper']



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
    let resourceDirections:any[] = []
    if(!resourceDirectionValues || resourceDirectionValues.length===0){
        resourceDirections = Object.values(RESOURCE_SHORTHAND_DICT);
    }
    for(let resourceDirectValue of resourceDirectionValues){
        resourceDirections.push(RESOURCE_SHORTHAND_DICT[resourceDirectValue]);
    }
    return resourceDirections
}
export const clearResourceFilters = () => {
    for(let resourceFilter of RESOUCE_FILTER_LIST){
        globalApeFilter.clearFilter(resourceFilter, 'in');
    }
    globalApeFilter.clearFilter('Resource Direction', 'in');
    globalApeFilter.clearFilter('Resource Tier', 'in');
    globalApeFilter.clearFilter('Resource Type', 'in');
    globalApeFilter.clearFilter('Resource Tiers', 'or');
    globalApeFilter.clearFilter('Resource Types', 'or');
    globalApeFilter.applyFilter();
    eventBus.dispatch('filter-applied',{});
};


export default function ResourceFilterModal(props: any) {
    const forceUpdate = useForceUpdate();
    const [filteredCards, setFilteredCards] = useState(resource_data);
    const [name, setName] = useState('');
    
    const clearFilters = () => {
        clearResourceFilters();
        forceUpdate();
    };

    const applyFilters=()=>{
        for(let resourceFilter of RESOUCE_FILTER_LIST){
            globalApeFilter.clearFilter(resourceFilter, 'in');
        }
        globalApeFilter.clearFilter('Resource Tiers', 'or');
        globalApeFilter.clearFilter('Resource Types', 'or');
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
        console.log('resourceTier', resourceTierFilter, 'resourceDirections', resourceDirections);
        if(resourceDirectionFilter.length > 0 && resourceTierFilter.length === 0 ){
            resourceTierFilter = ['1', '2', '3'];
        }
        if(resourceTierFilter){
            let resourceTierORFilterArr = [];
            for(let resourceDirection of resourceDirections){
                for(let resourceTier of resourceTierFilter){
                    resourceTierORFilterArr.push(
                        globalApeFilter.getFilterObj(resourceDirection + ' Tier', [resourceTier ], 'in'));
                }
            }
            if(resourceTierORFilterArr.length>0)
                globalApeFilter.addOrFilter('Resource Tiers', resourceTierORFilterArr);
        }
        let resourceTypeORFilterArr = [];
        if(resourceTypeFilter){
            for(let resourceDirection of resourceDirections){
                for(let resourceType of resourceTypeFilter){
                    resourceTypeORFilterArr.push(
                        globalApeFilter.getFilterObj(resourceDirection, [resourceType], 'in'))
                }
            }
            if(resourceTypeORFilterArr.length>0)
                globalApeFilter.addOrFilter(
                    'Resource Types', resourceTypeORFilterArr);
        }


        applyFilterGlobal();
        // setShowLoader(false);

        event("filter_bottom_tab", {
            category: "filter",
            label: 'apply_filter',
        });
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
            <ChipList data={direction_data} applyFilters={applyFilters} mainElemName="Resource Direction"/>
          </FlexWrapWrapper>
          <FilterSectionTitle>Tier</FilterSectionTitle>
          <FlexWrapWrapper type={'chip'}>
            <ChipList
                applyFilters={applyFilters}
                data={tier_data}
                mainElemName="Resource Tier"
            >              
            </ChipList>
          </FlexWrapWrapper>
          <FilterSectionTitle>Type</FilterSectionTitle>
          <FlexWrapWrapper type={'card'}>
            <ChipList applyFilters={applyFilters} data={filteredCards} mainElemName="Resource Type" />
          </FlexWrapWrapper>
          <FilterBottomTab applyFilters={applyFilters} clearFilters={clearFilters} />
        </ModalContainer>
    );
}
