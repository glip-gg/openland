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
import eventBus from '../../utils/eventBus';
import { event } from "nextjs-google-analytics";
import { applyFilterGlobal } from '../../utils/util';

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
    
export const clearRankFilters = () => {
    globalApeFilter.clearFilter('rank', 'range')
    globalApeFilter.applyFilter();
    eventBus.dispatch('filter-applied',{});
};

export default function RankFilterModal(props: any) {    
    const forceUpdate = useForceUpdate();

    let initValue = [0, 10000];
    let filterValue:any = globalApeFilter.getFilterValue('rank', 'range')
    if(filterValue.length>0){
        initValue = filterValue;
    }
    const [value, setValue] = useState(initValue);
    const clearFilters = () => {
        clearRankFilters();
        forceUpdate();
    };
    
    const applyFilter = (value:any) => {
        globalApeFilter.clearFilter('rank', 'range')
        globalApeFilter.addFilter('rank', [
            Number(value[0]), Number(value[1])], 'range');
        forceUpdate();

        applyFilterGlobal();

        event("filter_bottom_tab", {
            category: "filter",
            label: 'apply_filter',
        });
    }

    const setValueWrapper = (data: any) => {
        setValue([data[0], data[1]]);
        applyFilter([data[0], data[1]]);
    }

    return (
        <ModalContainer>

          <FilterSectionTitle>Rank</FilterSectionTitle>
          
          <Slider start={value[0]} end={value[1]}
                  setValue={setValue} setValueWrapper={setValueWrapper} min={0} max={100000}/>
          <Spacer />
          {/*
              <FlexWrapWrapper type={'chip'}>
              {type_chips}
              </FlexWrapWrapper>
            */}
          <FilterBottomTab clearFilters={clearFilters} applyFilters={applyFilter}  dontShowApply={false} />
        </ModalContainer>
    );
}
