import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
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
import globalApeFilter from '../../utils/globalFilter';
import { applyFilterGlobal } from '../../utils/util';
import CrossIcon from '../../assets/cross_icon.svg'
import Image from 'next/image';

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

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function addKodaAdvancedFilter(
    name:string, val:string, selected:boolean){
    let currKodaAdvancedFilters = globalApeFilter.getFilterValue(
        'KodaAdvanced', 'or'
    );
    let filterFound = false;
    for(let currKodaAdvancedFilter of currKodaAdvancedFilters as any[]){
        if(name === currKodaAdvancedFilter.name){
            filterFound = true;
            if(selected){
                currKodaAdvancedFilter.valArr.push(val);
            }
            else{
                currKodaAdvancedFilter.valArr = currKodaAdvancedFilter.valArr.filter((e:any) => e !== val);
            }
            break;
        }
    }
    if(!filterFound){
        let newFilterObj = globalApeFilter.getFilterObj(
            name, [val], 'in')
        globalApeFilter.addOrFilter(
            'KodaAdvanced', [newFilterObj]);
    }
    applyFilterGlobal();
}

const Icon = ({icon, onClick}: any) => {
    return (
        <div style={{cursor:'pointer'}} onClick={onClick}>
            <Image alt='' src={icon}  title="Back to Koda basic"/>
        </div>
    );
}

const DecoratedRow = (currentList:any) =>{
    //let active = (Math.random() < 0.5);
    
    const applyFilter = (index:number) => {
        let val = currentList[index].name;
        let name = currentList[index].category;
        console.log(val, name);
        globalApeFilter.addFilter(name, [val], 'in');
        applyFilterGlobal();
    }
    
    const gg = ({ index, style }:any) => {
        
        let active =  false;
        const checkActive = () =>{
            let active = false;
            let currKodaAdvancedFilters = globalApeFilter.getFilterValue(
                'KodaAdvanced', 'or'
            );
            for(let currKodaAdvancedFilter of currKodaAdvancedFilters as any[]){
                if(currentList[index].category === currKodaAdvancedFilter.name){
                    if(currKodaAdvancedFilter.valArr.includes(currentList[index].name)){
                        active = true;
                    }
                    
                }
            }
            return active;
        }
        active= checkActive();
        const forceUpdate = useForceUpdate();
        return (
            <KodaAdvancedItemDiv
                onClick={()=>{addKodaAdvancedFilter(
                    currentList[index].category,
                    currentList[index].name,
                    !active
                );
                    forceUpdate();
                }
                
                }
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
                }}
                >
                    <KodaAdvancedTitle>
                        {currentList[index].name}
                    </KodaAdvancedTitle>
                    <KodaAdvancedSubTitle>
                        {currentList[index].category}
                    </KodaAdvancedSubTitle>
                </div>
            </KodaAdvancedItemDiv>
        );
    }
    return gg;
}

const koda_properties_data: Array<String> = ['All', 'Clothing', 'Core', 'Eyes', 'Head', 'Weapon'];


export default function KodaAdvancedFilterModal(props: any) {
    
    const name = useRef('');
    
    const setName = (val:string)=>{
        name.current = val;
    }
    
    const [currPropertyList, setCurrPropertyList] = useState(
        PROCESSED_KODA_DATA);

    useEffect(() => {
        kodaPropertySelectionChange();
    },[]);
    
    const clearFilters = () => {
        
    };

    const applyTextFilter = (elemList:any[]) => {
        const results = elemList.filter((elem) => {
            return elem.name.toLowerCase().startsWith(
                name.current.toLowerCase())});
        return results;
    };

    const textFilter = (e: any) => {
        const keyword = e.target.value;
        setName(keyword);
        kodaPropertySelectionChange();
    };
    
    const kodaPropertySelectionChange = () => {
        let kodaPropertyValue = globalApeFilter.getFilterValue(
            'KodaProperty','in');
        console.log('kodaPropertyValue', kodaPropertyValue);
        if(kodaPropertyValue.includes('All') || kodaPropertyValue.length===0){
            
            setCurrPropertyList(applyTextFilter(PROCESSED_KODA_DATA));
            return;
        }
        setCurrPropertyList(
            applyTextFilter(
            PROCESSED_KODA_DATA.filter(
                (elem:any)=>kodaPropertyValue.includes(
                    elem.category))));
    }
    
    return (
        <div style={{display: 'flex',
                     justifyContent: 'flex-start',
                     flexDirection: 'column',
                     marginTop:24
        }}>
            <>
                <div style={{display:'flex',
                             justifyContent:'space-between',
                             alignItems: 'center'
                }}>
                    <Title>
                        Advanced Koda Properties</Title>
                    <Icon icon={CrossIcon} onClick={()=>{
                        console.log('set show advanced clicked');
                        props.setShowAdvanced(false)} }/>
                </div>
                <Spacer y={1} />
                
                <Input
                    clearable
                    onChange={textFilter}
                    contentRightStyling={false}
                    placeholder="Search"                
                />           
                
                <FilterSectionTitle>Type</FilterSectionTitle>
                <FlexWrapWrapper type={'chip'} style={{}}>
                    <ChipList
                        data={koda_properties_data}
                        mainElemName="KodaProperty"
                        setFiltersCB={()=>{kodaPropertySelectionChange()} }
                    >
                        
                    </ChipList>
                </FlexWrapWrapper>
            </>
            <FixedSizeList
                itemCount={currPropertyList.length}
                itemSize={68}
                height={500}
                width={"100%"}
            >
                {DecoratedRow(currPropertyList)}
            </FixedSizeList>
        </div>
    );
}
