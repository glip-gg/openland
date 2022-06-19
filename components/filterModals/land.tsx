import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import ModalContainer from './ModalContainer';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';

import Chip from '../ui/chip';
import FilterCard from '../ui/filterCard';

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


const category_images_dict:any = {
    'All': AllCategoryImage,
    "Spirit": SpiritCategoryImage,
    "Volcanic": VolcanicCategoryImage,
    "Harsh": HarshCategoryImage,
    "Decay": DecayCategoryImage,
    "Growth": GrowthCategoryImage,
    "Psychedelic": PsychedelicCategoryImage,
    "Mineral": MineralCategoryImage,
    "Chaos": ChaosCategoryImage
}
const sediment_tier_data: Array<String> = ['All', '1', '2', '3'];

const sediment_data: Array<String> = ['All', 'Infinite Expanse', 'Cosmic Dream', 'Chemical Goo', 'Rainbow Atmos', 'Biogenic Swamp'];

const category_data: Array<String> = ['All', "Spirit","Volcanic","Harsh","Decay","Growth","Psychedelic","Mineral","Chaos"];

const environment_data: Array<String> = ['All', "Steppes","Obsidian","Sands","Splinter","Ruins","Bog","Mystic","Thornwood","Sludge","Plague","Bone","Sulfuric","Wastes","Jungle","Mallow","Molten","Acid","Veldan","Spires","Glacia","Crimson","Biolume","Luster","Crystal","Sky","Shadow","Mycelium","Botanical","Chaos"];




const tier_data: Array<String> = ['All', '1', '2', '3'];

// Get actual tiers from somewhere! TODO
const sediment_tier_chips = (onChange:any) => sediment_tier_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`}  title={item} 
                                                                                                      active={false} onChange={onChange} mainElemName="Sediment Tier" />);

const sediment_chips = (onChange:any) => sediment_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}
                                                                                            onChange={onChange} mainElemName="Sediment"
/>);

const category_cards = (onChange:any) => category_data.map((item: any, index: any) => (
    <FilterCard 
        key={`sediment-tier-chip-${index}`} title={item} active={false}
        icon={category_images_dict[item]}
        onChange={onChange} mainElemName="Category"
    />)
);

const tier_chips = (onChange:any) => tier_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}
                                                                                    onChange={onChange} mainElemName="Environment Tier"
/>);

const environment_chips = (onChange:any) => environment_data.map((item: any, index: any) => <Chip key={`environment-tier-chip-${index}`} title={item} active={false} onChange={onChange} mainElemName="Environment"
/>);

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
export default function LandFilterModal(props: any) {

    const clearFilters = () => {};

    const setFilters = (name:string, val:string|number, active:boolean) => {
        if(active){
            globalApeFilter.addFilter(name, [val], 'in');
        }
        else{
            globalApeFilter.removeFilter(name, [val], 'in');
        }
    };

    
    
    return (
        <ModalContainer>
          <FilterSectionTitle>Sediment tier</FilterSectionTitle>

          <FlexWrapWrapper type={'chip'}>
            {sediment_tier_chips(setFilters)}
          </FlexWrapWrapper>

          <FilterSectionTitle>Sediment</FilterSectionTitle>

          <FlexWrapWrapper type={'chip'}>
            {sediment_chips(setFilters)}
          </FlexWrapWrapper>


          <FilterSectionTitle>Category</FilterSectionTitle>

          <FlexWrapWrapper type={'card'}>
            {category_cards(setFilters)}
          </FlexWrapWrapper>

          <FilterSectionTitle>Environment Tier</FilterSectionTitle>

          <FlexWrapWrapper type={'chip'}>
            {tier_chips(setFilters)}
          </FlexWrapWrapper>

          <FilterSectionTitle>Enviorment</FilterSectionTitle>

          <FlexWrapWrapper type={'chip'}>
            {environment_chips(setFilters)}
          </FlexWrapWrapper>           

          <FilterBottomTab />

        </ModalContainer>
    );
    }
