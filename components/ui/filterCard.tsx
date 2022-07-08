import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import Image from 'next/image';
import { event } from "nextjs-google-analytics";

const Card = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    background: #1A1A1A;
    border-radius: 12px;
    border:  ${props => props.active ? '1px solid rgba(255, 255, 255, 1)': '1px solid transparent'};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 21px 19px 9px 19px;
    margin: 4px;
    user-select: none; /* Standard */

`;


const Title = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    /* identical to box height, or 129% */

    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;
    margin-top: 13px;
    user-select: none; /* Standard */

    margin-bottom: 9px;
`;


const SubTitle = styled.div`    
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 17px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    color: rgba(255, 255, 255, 0.4);
    user-select: none; /* Standard */


`;


const Icon = ({icon}: any) => {
    return (
    <div>
        <Image alt='' src={icon} />
    </div>
    );
}

/*
    4 params
        Params:
        - icon
        - title
        - subtitle
        - active
        # no redux so onclick function will be a param mostly
*/ 
export default function FilterCard(
    {icon, title, subtitle, active, mainElemName, onChange=()=>{}}: any) {    

    const cardClick = () => {
        onChange(mainElemName, title, !active);
        // TODO add funciton for property
        event("filter_clicked", {
            category: mainElemName,
            label: title,
            value: subtitle,
          });
    };

    return (
        <Card className='hover border-hover' onClick={() => cardClick()} active={active}>
          {icon && <Icon icon={icon} />}
          {title && <Title style={{marginTop: icon ? 13 : 0}}>{title}</Title>}
          {subtitle && <SubTitle>{subtitle}</SubTitle>}
        </Card>
    );
}
