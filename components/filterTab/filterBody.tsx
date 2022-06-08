import styled from 'styled-components';
import { useState } from 'react';
import SortingDropDown from './sortingDropDown';
import ChipFilterDisplay from './ChipFilterDisplay';
import { Spacer } from '@nextui-org/react';

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


export default function FilterBody({lands, filters, floor}: any) {
    


    return (
        <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', height: '100%', width: '100%', overflow: 'hidden'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row',height: '100%', width: '100%'}}>
                <FilterTitle>{lands} LANDS</FilterTitle>
                <SortingDropDown  />
            </div>

            <Floor>Floor: {floor} eth</Floor>

            <Spacer />

            <ChipFilterDisplay rounded filters={filters} />
        </div>
    );
}
