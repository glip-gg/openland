import styled from 'styled-components';
import { useState } from 'react';

const Clear = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #FFFFFF;
    margin-left: 22px;
`;


/* 
9 properties of land card
- image
- id
- price
- name
- tier
- rank
- koda
- artifact
- resource
*/
export default function OtherCard({data}: any) {    


    return (
        <div style={{display: 'flex', flexGrow: 'grow'}}>
        </div>
    );
}
