import styled from 'styled-components';
import { useState } from 'react';
import SortingDropDown from './sortingDropDown';
import ChipFilterDisplay from './ChipFilterDisplay';
import { Spacer } from '@nextui-org/react';
import OtherCard from './OtherCard';

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
    

    const cards = [{
        id: 1241,
        price: 2.41,
        name: 'Splinter - Cosmic Dream',
        rank: '58 top 100%',
        tier: 1,
        koda: true,
        resource: false,
        artifact: true
    }, {
        id: 1241,
        price: 2.41,
        name: 'Splinter - Cosmic Dream',
        rank: '58 top 100%',
        tier: 1,
        koda: true,
        resource: false,
        artifact: true
    }, {
        id: 1241,
        price: 2.41,
        name: 'Splinter - Cosmic Dream',
        rank: '58 top 100%',
        tier: 1,
        koda: true,
        resource: false,
        artifact: true
    }].map((item: any, index: any) => <OtherCard key={`othercard-${index}`} data={item} />);


    return (
        <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', overflow: 'hidden'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', }}>
                <FilterTitle>{lands} LANDS</FilterTitle>
                <SortingDropDown  />
            </div>

            <Floor>Floor: {floor} eth</Floor>

            <Spacer />

            <ChipFilterDisplay rounded filters={filters} />
            <div style={{display: 'flex', flexWrap: 'wrap', marginLeft: -20, marginRight: -20}}>
                {cards}
            </div>
            <Spacer y={4} />
        </div>
    );
}
