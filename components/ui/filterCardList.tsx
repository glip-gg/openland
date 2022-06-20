import { useEffect, useState } from 'react';
import Chip from '../ui/chip';;
import FilterCard from '../ui/filterCard';

import globalApeFilter from '../../utils/globalFilter';


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
                globalApeFilter.addFilter(name, [...Object.keys(data)], 'in');
                forceUpdate();
            }
            else{
                globalApeFilter.addFilter(name, [val], 'in');
            }
        }
        else{
            globalApeFilter.removeFilter(name, [val], 'in');
        }
        forceUpdate();
    };

    const checkIfActive = (title:any)=>{
        let isActive = false;
        if(globalApeFilter.isValueActive(mainElemName, title)){
            isActive = true;
        }
        return isActive;
    }

    const listComp = Object.keys(data).map((item: any, index: any) => {
        const isActive = checkIfActive(item);
        return (
            <FilterCard 
                key={`${mainElemName}-${index}`} title={item} active={false}
                icon={data[item]}
                onChange={setFilters} mainElemName="Category"
                active={isActive}
            />)
    }
    );
    return (<>{listComp}</>);
}
