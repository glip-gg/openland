import { filterApeDeeds } from './apeDeedsModelManager';

let constructedFilters:{ [id: string] : ApeFilter; } = {};

interface FilterInterface {
    name: string;
    op:string;
    valArr:(string|number)[]
}

const NUMBER_TRAITS:string[] = [
    'Sediment Tier', 'Environment Tier',
    'Western Resource Tier', 'Eastern Resource Tier', 'Northern Resource Tier',
    'Southern Resource Tier',  'Plot'
]

class ApeFilter {
    
    public filters:{ [id: string] : FilterInterface; } = {};
    public constructor(){ }

    public addFilter(name:string, valArr: (string|number)[], op='in'){
        if(NUMBER_TRAITS.includes(name)){
            valArr = valArr.map(function(x:any) { 
                return parseInt(x, 10); 
            });
        }
        console.log('valArr', valArr);
        if(this.filters[name]){
            console.log('nice', valArr);
            this.filters[name].valArr = this.filters[name].valArr.concat(valArr);
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
        if(NUMBER_TRAITS.includes(name)){
            valArr = valArr.map(function(x:any) { 
                return parseInt(x, 10); 
            });
        }
        this.filters[name].valArr = this.filters[name].valArr.filter(
            function( el:any ) {
            return !valArr.includes( el );
        } );
    }
    
    public fetchCurrFilterResults(){
        JSON.stringify(this.filters);
    }

    async applyFilter(){
        console.log(this.filters);
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
