import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import Image from 'next/image';

const Card = styled.div`
  
    border:  ${props => props.active ? '1px solid rgba(255, 255, 255, 1)!important': '1px solid transparent'};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 8px 20px;
    background: #1A1A1A;
    border-radius: 100px;
    margin: 5px;
    color: #fff;
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #FFFFFF;
    user-select: none; /* Standard */

`;




/*
    2 params
        Params:
        - title
        - active
        # no redux so onclick function will be a param mostly
*/ 
export default function Chip({ title, active }: any) {      
    const [chipActive, setChipActive] = useState(active);

    const cardClick = () => {
        setChipActive(!chipActive);
        // TODO add funciton for property
    };

    return (
        <Card className='hover border-hover' onClick={() => cardClick()} active={chipActive}>
            {title}
        </Card>
    );
}
