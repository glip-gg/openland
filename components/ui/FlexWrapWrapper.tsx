import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import Image from 'next/image';

const Card = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    border:  ${props => props.active ? '1px solid rgba(255, 255, 255, 1)': '1px solid transparent'};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 8px 20px;
    background: #1A1A1A;
    border-radius: 100px;
    margin: 5px;
`;




/*
    2 params
        Params:
        - title
        - active
        # no redux so onclick function will be a param mostly
*/ 
export default function FlexWrapWrapper(props: any) {      

  
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            marginLeft: (props.type == 'chip') ? -5 : -4, 
            marginRight: (props.type == 'chip') ? -5 : -4, 
            }}>
            {props.children}
        </div>
    );
}
