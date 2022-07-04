import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import ModalContainer from './ModalContainer';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';
import Chip from '../ui/chip';
import FilterCard from '../ui/filterCard';
import FilterBottomTab from '../ui/FilterBottomTab';
import ExcludeIncludeFilterCard from '../ui/excludeIncludeFilterCard';
import {
    Input, 
} from '@nextui-org/react';
import globalApeFilter from '../../utils/globalFilter';
import eventBus from '../../utils/eventBus';

const koda_properties_data: Array<String> = ['All', 'Clothing', 'Core', 'Eyes', 'Head', 'Weapon', 'ID'];
const koda_properties_chips = koda_properties_data.map((item: any, index: any) => <Chip key={`koda_properties_chips-chip-${index}`} title={item} active={false}/>);
const koda_data: Array<any> = [{title: 'Mega koda', subtitle: '40.34Ξ (30,000)'}, {title: 'Weapon Koda', subtitle: '40.34Ξ (30,000)'}];
const koda_chips = koda_data.map((item: any, index: any) => <FilterCard key={`koda_chips-${index}`} title={item.title} subtitle={item.subtitle} active={false}/>);

const CardDesign = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 11px 24px 11px 16px;
    background: #1A1A1A;
    border-radius: 12px;
    margin: 6px;
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
    justify-content: flex-start;
`;

const Subtitle = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 17px;
    /* identical to box height */

    display: flex;
    align-items: center;
    justify-content: flex-start;

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



export const clearKodaFilters = () => {
    globalApeFilter.clearFilter('Koda', 'in');
    globalApeFilter.clearFilter('Koda', 'include');
    globalApeFilter.clearFilter('Koda', 'exclude');
    globalApeFilter.applyFilter();
    eventBus.dispatch('filter-applied',{});
};


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
export default function KodaFilterModal(props: any) {   
    const forceUpdate = useForceUpdate();
    const [showAdvanced, setShowAdvanced] = useState(false);

    const clearFilters = () => {
        clearKodaFilters();
        forceUpdate();
    };


    const applyFilters = () => {
        
    };


    const Card = ({title, subtitle}: any) => {
        return (
            <CardDesign>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </CardDesign>
        );
    }

    return (
        <ModalContainer>

          <FilterSectionTitle>Koda</FilterSectionTitle>

          <div style={{display: 'flex', marginTop: 8, marginBottom: 8, marginLeft: -6, marginRight: -6}}>
            <ExcludeIncludeFilterCard
                mainElemName="Koda"
                title="Kodas"
                showExclude={true}
            >
            </ExcludeIncludeFilterCard>
          </div>

          {showAdvanced && <>
            <FlexWrapWrapper type={'card'}>
              {koda_chips}
              <div style={{display: 'flex'}} onClick={() => setShowAdvanced(!showAdvanced)}>
                <FilterCard title={'Koda Advanced filters'} active={false} />
              </div>
            </FlexWrapWrapper>


            <Spacer y={1} />

            <Input
                clearable
                contentRightStyling={false}
                placeholder="Search"                
            />           

            <FilterSectionTitle>Type</FilterSectionTitle>
            <FlexWrapWrapper type={'chip'}>
              {koda_properties_chips}                
            </FlexWrapWrapper>
          </>
          }

          <FilterBottomTab clearFilters={clearFilters}/>


        </ModalContainer>
    );
}
