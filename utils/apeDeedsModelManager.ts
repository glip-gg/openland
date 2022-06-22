import _ from  'lodash';
import eventBus from './eventBus';

let gApeDeeds:any[] = [];


function addApePriceRankData(apePriceData:any){
    let priceObj = apePriceData.map((x:any) => {
        return ({ [x['tokenId']]: x });
    })
    gApeDeeds = gApeDeeds.map((obj, i) => {
        let currPriceObj = priceObj[obj['Plot']];
        return {
            ...obj,
            currentListPrice: currPriceObj.currentListPrice,
            
        }
    });
    
}

export async function addApeDeeds(apeDeeds:any, apePriceData:any){
    gApeDeeds = apeDeeds;
    addApePriceRankData(gApeDeeds)
    eventBus.dispatch('ape-deeds-added', gApeDeeds)
}

const EXCLUDED_RESOURCE_FILTERS = [
    'Resource Direction', 'Resource Tier', 'Resource Type'];
export async function filterApeDeeds(filtersObj:any){
    console.log(filtersObj);
    let processedFilterObj:any = {};
    for(let filterObjKey in filtersObj){
        if(EXCLUDED_RESOURCE_FILTERS.includes(filtersObj[filterObjKey].name)){
            continue
        }
        processedFilterObj[filterObjKey] = filtersObj[filterObjKey];
    }
    filtersObj = processedFilterObj;
    let filteredApeDeeds = _.filter(gApeDeeds, function(gApeDeed:any){
        let isIncluded = true;
        for(let filterObjKey in filtersObj){
            if(filtersObj[filterObjKey].op === 'include'){
                if(gApeDeed[filtersObj[filterObjKey].name]){
                        isIncluded = true;
                }
                else{
                    isIncluded = false;
                }
                
            }
            else if(filtersObj[filterObjKey].op === 'exclude'){
                if(!gApeDeed[filtersObj[filterObjKey].name]){
                    isIncluded = true;
                }
                else{
                    isIncluded = false;
                }
            }
            else if(filtersObj[filterObjKey].op === 'in'){
                if(!filtersObj[filterObjKey].valArr.includes(
                    gApeDeed[filtersObj[filterObjKey].name])){
                    isIncluded = false;;
                }
            }
        }
        return isIncluded;
    }  
    );
    return filteredApeDeeds;
}


export function getAllApeDeeds(){
    return gApeDeeds;
}
