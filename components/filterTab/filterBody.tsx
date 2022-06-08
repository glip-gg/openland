import styled from 'styled-components';
import { useState } from 'react';
import SortingDropDown from './sortingDropDown';

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



export default function FilterBody({lands, filters}: any) {
    


    return (
        <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row',height: '100%', width: '100%'}}>
            <FilterTitle>{lands} LANDS</FilterTitle>
            <SortingDropDown filters={filters} />
        </div>
    );
}
