import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import PROCESSED_KODA_DATA from './koda_advanced_data'
import {FixedSizeList} from  'react-window';
import {RadioButtonComponent} from  '../ui/RadioButton';
import {
    Input, 
} from '@nextui-org/react';
import Chip from '../ui/chip';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';
import ChipList from '../ui/chipList';

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


const Title = styled.span`
  font-family: 'Chakra Petch';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #FFFFFF;
`


const KodaAdvancedTitle = styled.span`
  font-family: 'Chakra Petch';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #FFFFFF;
`

const KodaAdvancedSubTitle = styled.span`
  font-family: 'Chakra Petch';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.4);
`

const KodaAdvancedItemDiv = styled.div`
  border:  ${props => props.active ? '1px solid rgba(255, 255, 255, 1)!important': '1px solid transparent'};
  width: 402px;
  height: 62px;
  background: #1A1A1A;
  border-radius: 12px;
  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  display: flex;
  align-items: center;
  flex-direction: row;
`



const DecoratedRow = (currentList:any) =>{
    let active = (Math.random() < 0.5);
    const gg = ({ index, style }:any) => (
        <KodaAdvancedItemDiv
            className='hover border-hover'
            active={active}
            style={{
                ...style, marginBottom:4, height:62,
                    paddingLeft: 16,
                marginTop:4}}>
            <div style={{
                display:'flex',
                flexDirection:'column',
                marginLeft:10
            }}>
                <KodaAdvancedTitle>
                    {currentList[index].name}
                </KodaAdvancedTitle>
                <KodaAdvancedSubTitle>
                    {currentList[index].category}
                </KodaAdvancedSubTitle>
            </div>
        </KodaAdvancedItemDiv>
    );
    return gg;
}

const koda_properties_data: Array<String> = ['All', 'Clothing', 'Core', 'Eyes', 'Head', 'Weapon', 'ID'];

export default function KodaAdvancedFilterModal(props: any) {    

    const clearFilters = () => {

    };

    const applyFilters = () => {
        
    };
    
    const kodaPropertySelectionChange = ()=>{
        
    }
    
    return (
        <div style={{display: 'flex',
                     justifyContent: 'flex-start',
                     flexDirection: 'column',}}>
            <>
                <Title style={{marginTop:24}}>Koda Properties</Title>
                <Spacer y={1} />
                
                <Input
                    clearable
                    contentRightStyling={false}
                    placeholder="Search"                
                />           
                
                <FilterSectionTitle>Type</FilterSectionTitle>
                <FlexWrapWrapper type={'chip'} style={{}}>
                    <ChipList
                        data={koda_properties_data}
                        mainElemName="Koda Property"
                        setFiltersCB={()=>{kodaPropertySelectionChange()} }
                    >
                        
                    </ChipList>
                </FlexWrapWrapper>
            </>
            <FixedSizeList
                itemCount={PROCESSED_KODA_DATA.length}
                itemSize={68}
                height={500}
                width={"100%"}
            >
                {DecoratedRow(PROCESSED_KODA_DATA)}
            </FixedSizeList>
        </div>
    );
}
