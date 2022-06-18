import { filterApeDeeds } from './apeDeedsModelManager';

let constructedFilters:{ [id: string] : ApeFilter; } = {};

interface FilterInterface {
    name: string;
    op:string;
    valArr:(string|number)[]
}


class ApeFilter {
    
    public filters:{ [id: string] : FilterInterface; } = {};
    public constructor(){ }
    
    public _addFilter(name:string, op:string, valArr:string[]) {
        this.filters[name] = {name, op, valArr}
    }

    public addFilter(name:string, valArr: (string|number)[], op='in'){
        if(this.filters[name]){
            this.filters[name].valArr.concat(valArr);
            // Make unique
            this.filters[name].valArr = Array.from(
                new Set(this.filters[name].valArr));
            // Done
        }
        else{
            this.filters[name] = {name, op, valArr}
        }
        console.log(this.filters);
        return true;
    }

    public removeFilter(name:string, valArr:(string|number)[], op='in'){
        //TODO
    }
    
    public fetchCurrFilterResults(){
        JSON.stringify(this.filters);
    }

    async applyFilter(){
        let filteredData = await filterApeDeeds(this.filters);
        return filteredData;
    }
}


export function getApeFilter(filterName:string){
    if(constructedFilters[filterName]){
        return constructedFilters[filterName];
    }
    else{
        constructedFilters[filterName] = new ApeFilter();
        return constructedFilters[filterName]
    }
}

const globalApeFilter = new ApeFilter();
export default globalApeFilter;
