import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import ModalContainer from './ModalContainer';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';
import Chip from '../ui/chip';
import FilterBottomTab from '../ui/FilterBottomTab';

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


const sediment_tier_data: Array<String> = ['All', '1', '2', '3', '4', '5'];
const sediment_data: Array<String> = ['All', 'Infinite Expanse', 'Cosmic Dream', 'Chemical Goo', 'Rainbow Atmos', 'Biogenic Swamp'];

const tier_data: Array<String> = ['All', '1', '2', '3', '4', '5'];

// Get actual tiers from somewhere! TODO
const sediment_tier_chips = sediment_tier_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);

const sediment_chips = sediment_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);

const category_cards = sediment_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);

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
export default function LandFilterModal(props: any) {    

    const clearFilters = () => {

    };

    const applyFilters = () => {
        
    };

    
    return (
        <ModalContainer>
            <FilterSectionTitle>Sediment tier</FilterSectionTitle>

            <FlexWrapWrapper type={'chip'}>
                {sediment_tier_chips}
            </FlexWrapWrapper>

            <FilterSectionTitle>Sediment</FilterSectionTitle>

            <FlexWrapWrapper type={'chip'}>
                {sediment_chips}
            </FlexWrapWrapper>


            <FilterSectionTitle>Category</FilterSectionTitle>

            <FlexWrapWrapper type={'card'}>
                {category_cards}
            </FlexWrapWrapper>

            <FilterSectionTitle>Tier</FilterSectionTitle>

            <FlexWrapWrapper type={'chip'}>
                {tier_chips}
            </FlexWrapWrapper>

            <FilterSectionTitle>Enviorment</FilterSectionTitle>

            <FlexWrapWrapper type={'card'}>
                {category_cards}
            </FlexWrapWrapper>           

            <FilterBottomTab />

        </ModalContainer>
    );
}
