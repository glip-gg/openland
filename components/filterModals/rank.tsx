import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';

import ModalContainer from './ModalContainer';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';
import Chip from '../ui/chip';
import FilterBottomTab from '../ui/FilterBottomTab';
import Slider from '../ui/slider';

import globalApeFilter from '../../utils/globalFilter';

const type_data: Array<String> = ['Top 1%', 'Top 5%', 'Top 10%', 'Top 25%'];
const type_chips = type_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);

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

export default function RankFilterModal(props: any) {    
    const forceUpdate = useForceUpdate();
    
    const [value, setValue] = useState([0, 10000]);
    
    const clearFilters = () => {
        globalApeFilter.clearFilter('rank', 'range')
    };

            

    const applyFilter = () => {
        globalApeFilter.clearFilter('rank', 'range')
        globalApeFilter.addFilter('rank', [
            Number(value[0]), Number(value[1])], 'range');
        forceUpdate();
    }

    return (
        <ModalContainer>

          <FilterSectionTitle>Rank</FilterSectionTitle>
          
          <Slider start={value[0]} end={value[1]}
                  setValue={setValue} min={0} max={100000}/>
          <Spacer />
          {/*
              <FlexWrapWrapper type={'chip'}>
              {type_chips}
              </FlexWrapWrapper>
            */}
          <FilterBottomTab clearFilters={clearFilters} applyFilters={applyFilter} />
        </ModalContainer>
    );
}
