import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import ModalContainer from './ModalContainer';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';
import Chip from '../ui/chip';
import Slider from '../ui/slider';
import FilterBottomTab from '../ui/FilterBottomTab';

import globalApeFilter from '../../utils/globalFilter';

const currency_data: Array<String> = ['All', 'ETH', 'wETH', 'APE'];
const currency_chips = currency_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);


const status_data: Array<String> = ['All', 'Buy now', 'Auction'];
const status_chips = status_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);


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

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function PriceFilterModal(props: any) {
    const forceUpdate = useForceUpdate();
    const [value, setValue] = useState([0, 1000]);
    
    const clearFilters = () => {
        globalApeFilter.clearFilter('currentListPrice', 'range')
    };


    
    const applyFilter = () => {
        globalApeFilter.clearFilter('currentListPrice', 'range')
        globalApeFilter.addFilter('currentListPrice', [
            Number(value[0]), Number(value[1])], 'range');
        forceUpdate();
    }


    return (
        <ModalContainer>

          <FilterSectionTitle>Price</FilterSectionTitle>
          
          <Slider start={value[0]} end={value[1]}
                  setValue={setValue} min={0}
                  max={1000}/>
          {/*
              <FilterSectionTitle>Currency</FilterSectionTitle>
              <FlexWrapWrapper type={'chip'}>
              {currency_chips}
              </FlexWrapWrapper>

              <FilterSectionTitle>Status</FilterSectionTitle>
              <FlexWrapWrapper type={'chip'}>
              {status_chips}
              </FlexWrapWrapper>
            */}

          <FilterBottomTab clearFilters={clearFilters} applyFilters={applyFilter} />


        </ModalContainer>
    );
}
