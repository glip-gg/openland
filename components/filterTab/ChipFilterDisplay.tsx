import styled from 'styled-components';
import { useState } from 'react';
import { Tag } from "rsuite";

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

export default function ChipFilterDisplay({filters}: any) {    

    const filterClosed = (item: any) => {};
    
    const chipItems = filters.map((item: any, index: any) => <Tag style={{
        margin: 5,
        borderRadius: 100,
        background: '#191919',
        color: '#fff',
        padding: '8px 26px'
        }} size="lg" key={`sortingdropdown-${index}`} closable
        onClose={() => filterClosed(item)}
        >{item}</Tag> );

    return (
        <div style={{display: 'flex', flexGrow: 'grow'}}>
            {chipItems}
            {chipItems.length > 0 && <Clear>Clear all filters</Clear>}
        </div>
    );
}
