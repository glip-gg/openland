import _ from  'lodash';
import eventBus from './eventBus';

let gApeDeeds:any[] = [];


function addApePriceRankData(apePriceData:any){
    console.log()
    let priceObj:any = {}
    apePriceData.map((x:any) => {
        priceObj[x['tokenId']]=x;
    })
    console.log('priceObj', priceObj)
    gApeDeeds = gApeDeeds.map((obj, i) => {
        let currPriceObj = priceObj[String(obj['Plot'])];
        //console.log('currPriceObj', currPriceObj);
        let currentListCurrency:any = '';
        //if(currPriceObj.currentListPriceCurrency){
        if(currPriceObj.currentListCurrency){
            //currentListCurrency = currPriceObj.currentListPriceCurrency.name;
            currentListCurrency = currPriceObj.currentListCurrency.name;
        }
        return {
            ...obj,
            currentListPrice: (Number(currPriceObj.currentListPrice)/1000000000000000000),
            currentListCurrency: currentListCurrency,
            rank: Number(currPriceObj.rank),
            score: Number(currPriceObj.score),
        }
    });
    
}

export async function addApeDeeds(apeDeeds:any, apePriceData:any){
    gApeDeeds = apeDeeds;
    console.log(apePriceData)
    addApePriceRankData(apePriceData)
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
                if(gApeDeed[filtersObj[filterObjKey].name] || gApeDeed[filtersObj[filterObjKey].name] === 0){
                    isIncluded = true;
                }
                else{
                    return false;
                }
                
            }
            if(filtersObj[filterObjKey].op === 'range'){
                let filterName = filtersObj[filterObjKey].name;
                let filterVals = filtersObj[filterObjKey].valArr;
                let apeDeedVal = gApeDeed[filterName];
                if(apeDeedVal < filterVals[0] || apeDeedVal > filterVals[1] ){
                    isIncluded = false;
                }
                if(!apeDeedVal && apeDeedVal != 0){
                    return false;
                }
            }
            else if(filtersObj[filterObjKey].op === 'exclude'){
                if(!gApeDeed[filtersObj[filterObjKey].name] && gApeDeed[filtersObj[filterObjKey].name] != 0){
                    isIncluded = true;
                }
                else{
                    return false;
                }
            }
            else if(filtersObj[filterObjKey].op === 'in'){
                if(!filtersObj[filterObjKey].valArr.includes(
                    gApeDeed[filtersObj[filterObjKey].name])){
                    return false;;
                }
            }
        }
        return isIncluded;
    }  
    );
    return filteredApeDeeds;
}

function _getFloor(apeDeeds:any[]){
    let floorPrice = Number.MAX_SAFE_INTEGER;
    for(let apeDeed of apeDeeds){
        if(apeDeed.currentListPrice < floorPrice &&
            apeDeed.currentListPrice !=0 && apeDeed.currentListPrice> 0.0001){
            console.log('current price changed', apeDeed.currentListPrice);
            console.log('current price changed', apeDeed.Plot);
            console.log('current price changed', apeDeed.currentListCurrency);
            
            floorPrice = apeDeed.currentListPrice;
        }
    }
    if(floorPrice == Number.MAX_SAFE_INTEGER){
        return 0;
    }
    return floorPrice;
}
export function getFloor(filteredApeDeeds:any[]){
    if(!filteredApeDeeds){
        return _getFloor(gApeDeeds);
    }
    if(filteredApeDeeds.length === 0){
        return 0;
    }
    return _getFloor(filteredApeDeeds);
}

export function getAllApeDeeds(){
    return gApeDeeds;
}

export function getLandData(index:number){
    return gApeDeeds[index];
}
