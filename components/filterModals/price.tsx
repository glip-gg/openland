import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import ModalContainer from './ModalContainer';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';
import Chip from '../ui/chip';
import FilterBottomTab from '../ui/FilterBottomTab';


const currency_data: Array<String> = ['All', 'ETH', 'wETH', 'APE'];
const currency_chips = currency_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);


const status_data: Array<String> = ['All', 'Buy now', 'Auction'];
const status_chips = status_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);


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
export default function PriceFilterModal(props: any) {    

    const clearFilters = () => {

    };

    const applyFilters = () => {
        
    };

    return (
        <ModalContainer>

            <FilterSectionTitle>Price</FilterSectionTitle>
            
            
            
            <FilterSectionTitle>TODO SLIDER</FilterSectionTitle>

            

            <FilterSectionTitle>Currency</FilterSectionTitle>
            <FlexWrapWrapper type={'chip'}>
                {currency_chips}
            </FlexWrapWrapper>

            <FilterSectionTitle>Status</FilterSectionTitle>
            <FlexWrapWrapper type={'chip'}>
                {status_chips}
            </FlexWrapWrapper>


            <FilterBottomTab />


        </ModalContainer>
    );
}
