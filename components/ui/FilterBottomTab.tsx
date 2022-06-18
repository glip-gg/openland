import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import Image from 'next/image';

import globalApeFilter from '../../utils/globalFilter';
import eventBus from '../../utils/eventBus';

const Card = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 13px 24px;
    background: #1A1A1A;
    border-radius: 0px;
    border-top: 1px solid rgba(44, 44, 44, 1);
    position: fixed;
    bottom: 0px;
    width: 100%;
    margin-left: -24px;
    margin-right: -24px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
`;


const Title = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #FFFFFF;
`;


const Button = styled.div`    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 11px 24px;

    background: #FFFFFF;
    border-radius: 12px;
    color: black;
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #000000;
`;



/*
    2 params
        Params:
        - title
        - active
*/ 
export default function FilterBottomTab(props: any) {      

    const clearFilters = () => {
        props.clearFilters();
    };

    const applyFilters = () => {
        eventBus.dispatch('filter-applied',{});
    };

    return (
        <Card>
          <Title className='hover' onClick={() => clearFilters()}>Clear filters</Title>
          <Button className='hover' onClick={() => applyFilters()}>Apply filter</Button>
        </Card>
    );
    }
