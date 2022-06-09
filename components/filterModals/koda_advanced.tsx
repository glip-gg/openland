import styled from 'styled-components';
import { useState } from 'react';
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
export default function KodaAdvancedFilterModal(props: any) {    

    const clearFilters = () => {

    };

    const applyFilters = () => {
        
    };

    return (
        <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', overflow: 'hidden'}}>

        </div>
    );
}
