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
import eventBus from '../../utils/eventBus';
import { event } from "nextjs-google-analytics";
import { applyFilterGlobal } from '../../utils/util';

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
export const clearPriceFilters = () => {
    globalApeFilter.clearFilter('currentListPrice', 'range')
};

export default function PriceFilterModal(props: any) {
    const forceUpdate = useForceUpdate();
    let initValue = [0, 1000];
    let filterValue:any = globalApeFilter.getFilterValue('currentListPrice', 'range');
    if(filterValue.length > 0){
        initValue = filterValue;
    }
    const [value, setValue] = useState(initValue);
    
    
    const clearFilters = () => {
        clearPriceFilters();
        forceUpdate();
    };

    const setValueWrapper = (data: any) => {
        console.log(data, 'value chagnedssss');
        setValue([data[0], data[1]]);
        console.log(value);
        applyFilter([data[0], data[1]]);
    }
    
    const applyFilter = (value:any) => {
        console.log('vals', value[0], value[1])
        console.log(value);
        globalApeFilter.clearFilter('currentListPrice', 'range')
        globalApeFilter.addFilter('currentListPrice', [
            Number(value[0]), Number(value[1])], 'range');
        forceUpdate();
        applyFilterGlobal();
        
        event("filter_bottom_tab", {
            category: "filter",
            label: 'apply_filter',
        });
        
    }


    return (
        <ModalContainer>

          <FilterSectionTitle>Price</FilterSectionTitle>          
          <Slider start={value[0]} end={value[1]}
                  setValue={setValue}
                  setValueWrapper={setValueWrapper} min={0}
                  max={500}/>
          <FilterBottomTab clearFilters={clearFilters} applyFilters={applyFilter} dontShowApply={false} />


        </ModalContainer>
    );
}
