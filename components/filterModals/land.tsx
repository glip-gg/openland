import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import ModalContainer from './ModalContainer';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';

import Chip from '../ui/chip';
import ChipList from '../ui/chipList';
import FilterCard from '../ui/filterCard';
import FilterCardList from '../ui/filterCardList';

import FilterBottomTab from '../ui/FilterBottomTab';

import globalApeFilter from '../../utils/globalFilter';

import AllCategoryImage from '../../assets/filter/all_category.svg'
import ChaosCategoryImage from '../../assets/filter/chaos_category.svg'
import DecayCategoryImage from '../../assets/filter/decay_category.svg'
import GrowthCategoryImage from '../../assets/filter/growth_category.svg'
import HarshCategoryImage from '../../assets/filter/harsh_category.svg'
import MineralCategoryImage from '../../assets/filter/mineral_category.svg'
import PsychedelicCategoryImage from '../../assets/filter/psychedelic_category.svg'
import SpiritCategoryImage from '../../assets/filter/spirit_category.svg'
import VolcanicCategoryImage from '../../assets/filter/volcanic_category.svg'

import eventBus from '../../utils/eventBus';

const category_images_dict:any = {
    'All': AllCategoryImage,
    "Chaos": ChaosCategoryImage,
    "Decay": DecayCategoryImage,
    "Growth": GrowthCategoryImage,
    "Harsh": HarshCategoryImage,
    "Mineral": MineralCategoryImage,
    "Psychedelic": PsychedelicCategoryImage,
    "Spirit": SpiritCategoryImage,
    "Volcanic": VolcanicCategoryImage,
}

const tier_data: Array<String> = ['All', '1', '2', '3'];
const env_tier_data: Array<String> = ['All', '1', '2', '3', '4', '5'];

const sediment_data: Array<String> = ['All', 'Biogenic Swamp', 'Chemical Goo', 'Cosmic Dream', 'Infinite Expanse', 'Rainbow Atmos'];

const environment_data: Array<String> = ['All','Acid','Biolume', 'Bog', 'Bone', 'Botanical', 'Chaos', 'Crimson', 'Crystal', 'Glacia', 'Jungle', 'Luster', 'Mallow', 'Molten', 'Mycelium', 'Mystic', 'Obsidian', 'Plague', 'Ruins', 'Sands', 'Shadow', 'Sky', 'Sludge', 'Spires', 'Splinter', 'Steppes', 'Sulfuric', 'Thornwood', 'Veldan', 'Wastes'];



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


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export const clearLandFilters = () => {
    let landFilter = [
        'Sediment Tier', 'Sediment', 'Category',
        'Environment Tier', 'Environment'];
    landFilter.map((name:string)=>{
        globalApeFilter.clearFilter(name);
    });
    globalApeFilter.applyFilter();
    eventBus.dispatch('filter-applied',{});
};

export default function LandFilterModal(props: any) {
    const forceUpdate = useForceUpdate();
    
    const clearFilters = () => {
        clearLandFilters();
        forceUpdate();
    };
    
    
    return (
        <ModalContainer>
          <FilterSectionTitle>Sediment tier</FilterSectionTitle>

          <FlexWrapWrapper type={'chip'}>
            <ChipList data={tier_data}
                      mainElemName="Sediment Tier"></ChipList>
          </FlexWrapWrapper>

          <FilterSectionTitle>Sediment</FilterSectionTitle>

          <FlexWrapWrapper type={'chip'}>
            <ChipList data={sediment_data}
                      mainElemName="Sediment"></ChipList>
          </FlexWrapWrapper>


          <FilterSectionTitle>Category</FilterSectionTitle>

          <FlexWrapWrapper type={'card'}>
            <FilterCardList data={category_images_dict}
                            mainElemName="Category"></FilterCardList>
          </FlexWrapWrapper>

          <FilterSectionTitle>Environment Tier</FilterSectionTitle>

          <FlexWrapWrapper type={'chip'}>
            <ChipList data={env_tier_data}
                      mainElemName="Environment Tier"></ChipList>
          </FlexWrapWrapper>

          <FilterSectionTitle>Enviorment</FilterSectionTitle>

          <FlexWrapWrapper type={'chip'}>
            <ChipList data={environment_data}
                      mainElemName="Environment"></ChipList>
          </FlexWrapWrapper>           

          <FilterBottomTab clearFilters={clearFilters} />

        </ModalContainer>
    );
}
