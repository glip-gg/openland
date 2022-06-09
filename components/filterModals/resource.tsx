import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import ModalContainer from './ModalContainer';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';
import Chip from '../ui/chip';
import FilterBottomTab from '../ui/FilterBottomTab';
import {
    Input, 
  } from '@nextui-org/react';


const type_data: Array<String> = ['All', 'S', 'W', 'E', 'S'];
const type_chips = type_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);

const tier_data: Array<String> = ['All', 'Anima', 'Ore', 'Root', 'Shard'];
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
export default function ResourceFilterModal(props: any) {    

    const clearFilters = () => {

    };

    const applyFilters = () => {
        
    };


    return (
        <ModalContainer>

            <FilterSectionTitle>Resources</FilterSectionTitle>

            <Input
                clearable
                contentRightStyling={false}
                placeholder="Search"                
            />

            <FilterSectionTitle>Type</FilterSectionTitle>
            <FlexWrapWrapper type={'chip'}>
                {type_chips}
            </FlexWrapWrapper>

            <FilterSectionTitle>Tier</FilterSectionTitle>
            <FlexWrapWrapper type={'chip'}>
                {tier_chips}
            </FlexWrapWrapper>


            <FilterBottomTab />


        </ModalContainer>
    );
}
