import _ from  'lodash';
import eventBus from './eventBus';

let gApeDeeds:any[] = [];

export async function addApeDeeds(apeDeeds:any){
    gApeDeeds = apeDeeds;
    eventBus.dispatch('ape-deeds-added', gApeDeeds)
}


export async function filterApeDeeds(filtersObj:any){
    console.log(filtersObj);
    let filteredApeDeeds = _.filter(
        gApeDeeds, function(gApeDeed:any) {
            for(let filterObjKey in filtersObj){
                if(filtersObj[filterObjKey].op === 'include'){
                    if(gApeDeed[filtersObj[filterObjKey].name]){
                        return true;
                    }
                    return false;
                }
                if(filtersObj[filterObjKey].op === 'exclude'){
                    if(!gApeDeed[filtersObj[filterObjKey].name]){
                        return true;
                    }
                    return false;
                }
                if(!filtersObj[filterObjKey].valArr.includes(
                    gApeDeed[filtersObj[filterObjKey].name])){
                    return false
                }
            }
            return true;
        }  
    );
    return filteredApeDeeds;
}


export function getAllApeDeeds(){
    return gApeDeeds;
}
