import _ from  'lodash';
import { filterApeDeeds, getAllApeDeeds } from './apeDeedsModelManager';
import eventBus from './eventBus';


let constructedFilters:{ [id: string] : ApeFilter; } = {};

interface FilterInterface {
    name: string;
    op:string;
    valArr:(string|number|FilterInterface)[]
}

const EXCLUDE_INCLUDE_OPS  = ['include', 'exclude'];

function areEqual(array1:any[], array2:any[]) {
    return _.isEmpty(_.xor(array1, array2))
}

const NUMBER_TRAITS:string[] = [
    'Sediment Tier', 'Environment Tier',
    'Western Resource Tier', 'Eastern Resource Tier', 'Northern Resource Tier',
    'Southern Resource Tier',  'Plot',
]

class ApeFilter {
    
    public filters:{ [id: string] : FilterInterface; } = {};
    public constructor(){ }

    public clearFilter(name:string, op='in'){
        let key = this.getKey(name, op);
        delete this.filters[key];
    }

    getKey(name:string, op:string){
        return name+op;
    }

    public getFilterValue(name:string, op:string){
        let key = this.getKey(name, op);
        if(this.filters[key]){
            return this.filters[key].valArr;
        }
        return [];
    }

    public addOrFilter(name:string, filters: (FilterInterface)[], op='or'){
        let key  = this.getKey(name, op);
        if(this.filters[key]){
          this.filters[key].valArr = this.filters[key].valArr.concat(filters);
            // Done
        }
        else{
            this.filters[key] = {name, op, valArr:filters}
        }
        return true;
    }

    public getFilterObj(name:string, valArr:(string|number|FilterInterface)[], op='in'):FilterInterface{
        if(NUMBER_TRAITS.includes(name)){
            valArr = valArr.map(function(x:any) { 
                return parseInt(x, 10); 
            });
        }
        return {name, op, valArr}
    }
    
    public addFilter(name:string, valArr: (string|number)[], op='in'){
        if(NUMBER_TRAITS.includes(name)){
            valArr = valArr.map(function(x:any) { 
                return parseInt(x, 10); 
            });
        }
        let key  = this.getKey(name, op);
        if(this.filters[key]){
            console.log('nice', valArr);
          this.filters[key].valArr = this.filters[key].valArr.concat(
            valArr);
            this.filters[key].valArr = Array.from(
                new Set(this.filters[key].valArr));
            // Done
        }
        else{
            this.filters[key] = {name, op, valArr}
        }
        console.log(this.filters);
        return true;
    }

    public removeFilter(name:string, valArr:(string|number)[], op='in'){
        if(NUMBER_TRAITS.includes(name)){
            valArr = valArr.map(function(x:any) { 
                return parseInt(x, 10); 
            });
        }
        let key = this.getKey(name, op);
        if(EXCLUDE_INCLUDE_OPS.includes(op)){
            delete this.filters[key];
            return true;
        }
        this.filters[key].valArr = this.filters[key].valArr.filter(
            function( el:any ) {
            return !valArr.includes( el );
            });
        if(this.filters[key].valArr.length === 0){
            delete this.filters[key]
        }
    }
    
    public fetchCurrFilterResults(){
        JSON.stringify(this.filters);
    }

    async applyFilter(){
        console.log(this.filters);
        let filteredData = filterApeDeeds(this.filters);
        eventBus.dispatch('new-filtered-data', filteredData);
        return filteredData;
    }

    getAllApeDeeds(){
        console.log(this.filters);
        let filteredData = getAllApeDeeds();
        return filteredData;
    }

    isValueActive(
        mainElemName:string, title:string|number, data:any[], op='in'){
        let key = this.getKey(mainElemName, op);
        if(EXCLUDE_INCLUDE_OPS.includes(op)){
            if(this.filters[key]){
                return true;
            }
            return false;
        }
        if(!this.filters[key]){
            if(title === 'All'){
                return true;
            }
            return false;
        }
        if(title === 'All'){
            if(NUMBER_TRAITS.includes(mainElemName)){
                data = data.map(str => {
                    return Number(str);
                });
            }
            console.log(data, this.filters[key].valArr)
            if(areEqual(data, this.filters[key].valArr)){
                return true;
            }
            console.log('sad');
            return false
        }
        if(NUMBER_TRAITS.includes(mainElemName)){
            title = Number(title);
        }
        if(this.filters[key].valArr.includes(title)){
            return true;
        }
        return false;
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
