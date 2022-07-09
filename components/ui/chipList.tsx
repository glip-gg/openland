import { useEffect, useState } from 'react';
import Chip from '../ui/chip';;
import { event } from "nextjs-google-analytics";

import globalApeFilter from '../../utils/globalFilter';
import { applyFilterGlobal } from '../../utils/util';


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function ChipList({ mainElemName, data, setFiltersCB, applyFilters}: any ) {
    const forceUpdate = useForceUpdate();
    
    const setFilters = (name:string, val:string|number, active:boolean) => {
        // console.log('data', data);
        // console.log(val);
        if(active){
            if(val === 'All'){
                globalApeFilter.addFilter(name, [...(data.filter(
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
        if(setFiltersCB){
            setFiltersCB(name, val, active);
        }
        forceUpdate();

        if(applyFilters) applyFilters();
        else applyFilterGlobal();


        event(`chip_clicked_${mainElemName}`, {
            category: name,
            label: `${val}`,
        });
    };

    const checkIfActive = (title:any)=>{
        let isActive = false;
        if(globalApeFilter.isValueActive(
            mainElemName, title, [...(data.filter(
                (item:any) => item !== 'All') )])){
            isActive = true;
        }
        return isActive;
    }
    
    const listComp = data.map((item: any, index: any) => {
        const isActive = checkIfActive(item);

        return ( 
            <Chip key={`${mainElemName}-${index}`}
                  title={item} onChange={setFilters}
                  mainElemName={mainElemName}
                  active={isActive} />
        )}
        )

    return (<>{listComp}</>);
}
