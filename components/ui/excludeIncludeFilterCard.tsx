import { useEffect, useState } from 'react';
import FilterCard from '../ui/filterCard';

import globalApeFilter from '../../utils/globalFilter';


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function getOpposite(excludeIncludeType:string){
    if(excludeIncludeType === 'include')
        return 'exclude';
    return 'include';
}

export default function ExcludeIncludeFilterCard(
    { mainElemName, showExclude, image, title}: any) {    
    const forceUpdate = useForceUpdate();
    
    
    const setFilters = (name:string, val:string|number, active:boolean, excludeIncludeType:string) => {
        console.log(val);        
        if(active){
            globalApeFilter.addFilter(name, [1], excludeIncludeType);
            globalApeFilter.removeFilter(name, [1], getOpposite(excludeIncludeType));
        }
        else{
            globalApeFilter.removeFilter(name, [1], excludeIncludeType);
        }
        forceUpdate();
    };

    const checkIfActive = (title:any, exclInclType:string)=>{
        let isActive = false;
        if(globalApeFilter.isValueActive(
            mainElemName, title, [], exclInclType)){
            isActive = true;
        }
        return isActive;
    }

    const isActiveInclude = checkIfActive(mainElemName, 'include');
    const isActiveExclude = checkIfActive(mainElemName, 'exclude');
    return (
        <>
          <FilterCard 
              key={`${mainElemName}-include`}
              title={`${title} Only`}
            //   subtitle={'4.34 (4,000)'}
              subtitle={''}
              icon={image}
              onChange={(name:string, val:string|number, active:boolean)=> {
                  setFilters(name, val, active, 'include')}}
              mainElemName={mainElemName}
              active={isActiveInclude}
          />
          {showExclude && (
              <FilterCard 
                  key={`${mainElemName}-exclude`}
                  title={`Exclude ${title}`}
                //   subtitle={'4.34 (4,000)'}
                  subtitle={''}
                  icon={image}
                  onChange={(name:string, val:string|number, active:boolean)=> {
                      setFilters(name, val, active, 'exclude')}}
                  mainElemName={mainElemName}
                  active={isActiveExclude}
              />
          )}
        </>
    );
}
