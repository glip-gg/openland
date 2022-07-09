import { useEffect, useState } from 'react';
import FilterCard from '../ui/filterCard';

import globalApeFilter from '../../utils/globalFilter';
import { applyFilterGlobal } from '../../utils/util';


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function FilterCardList(
    { mainElemName, data, }: any) {    
    const forceUpdate = useForceUpdate();
    
    
    const setFilters = (name:string, val:string|number, active:boolean) => {
        console.log('data', data);
        console.log(val);        
        if(active){
            if(val === 'All'){
                globalApeFilter.addFilter(name, [...(Object.keys(data).filter(
                    (item:any) => item !== 'All') )], 'in');
                forceUpdate();
            }
            else{
                globalApeFilter.addFilter(name, [val], 'in');
            }
        }
        else{
            if(val === 'All'){
                return;
            }
            globalApeFilter.removeFilter(name, [val], 'in');
        }
        forceUpdate();
        applyFilterGlobal();
    };

    const checkIfActive = (title:any)=>{
        let isActive = false;
        if(globalApeFilter.isValueActive(
            mainElemName, title, [...(Object.keys(data).filter(
                (item:any) => item !== 'All') )])){
            isActive = true;
        }
        return isActive;
    }

    const listComp = Object.keys(data).map((item: any, index: any) => {
        const isActive = checkIfActive(item);
        return (
            <FilterCard 
                key={`${mainElemName}-${index}`} title={item}
                icon={data[item]}
                onChange={setFilters} mainElemName="Category"
                active={isActive}
            />)
    }
    );
    return (<>{listComp}</>);
}
