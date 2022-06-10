import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';

import ModalContainer from './ModalContainer';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';
import Chip from '../ui/chip';
import FilterBottomTab from '../ui/FilterBottomTab';
import Slider from '../ui/slider';


const type_data: Array<String> = ['Top 1%', 'Top 5%', 'Top 10%', 'Top 25%'];
const type_chips = type_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);

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
export default function RankFilterModal(props: any) {    

    const clearFilters = () => {

    };

    const applyFilters = () => {
        
    };

    return (
        <ModalContainer>

            <FilterSectionTitle>Rank</FilterSectionTitle>
                                    
            <Slider start={10} end={100} min={2} max={200}/>
            <Spacer />
            
            <FlexWrapWrapper type={'chip'}>
                {type_chips}
            </FlexWrapWrapper>
            
            <FilterBottomTab />
        </ModalContainer>
    );
}
