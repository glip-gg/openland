import _ from  'lodash';
import eventBus from './eventBus';

let gApeDeeds:any[] = [];
export const SORTING_OPTION_PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH';
export const SORTING_OPTION_PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW';
export const SORTING_OPTIONS = [{[SORTING_OPTION_PRICE_LOW_TO_HIGH]: 'Price: Low to High'}, {[SORTING_OPTION_PRICE_HIGH_TO_LOW]: 'Price: High to Low'}]


function addApePriceRankData(apeDeeds:any,apePriceData:any){
    console.log()
    let priceObj:any = {}
    apePriceData.map((x:any) => {
        priceObj[x['tokenId']]=x;
    })
    console.log('priceObj', priceObj)
    apeDeeds = apeDeeds.map((obj, i) => {
        let currPriceObj = priceObj[String(obj['Plot'])];
        let currentListCurrency:any = '';
        if(currPriceObj && currPriceObj.currentListCurrency){
            currentListCurrency = currPriceObj.currentListCurrency.name;
        }
        let mega= undefined;
        if(obj.Koda && Number(obj.Koda)>= 9901){
            mega = true;
        }
        let rank = -1;
        if(Number(currPriceObj.rank)){
            rank = Number(currPriceObj.rank)
        }
        return {
            ...obj,
            Plot: Number(obj['Plot']),
            currentListPrice: Number(currPriceObj.currentListPrice),
            currentListCurrency: currentListCurrency,
            rank: rank,
            score: Number(currPriceObj.score),
            Mega: mega
        }
    });
    apeDeeds.sort((a:any,b:any) => a.Plot - b.Plot);
    console.log('apeDeedsSorted', apeDeeds)
    gApeDeeds = apeDeeds;
}

export function addApeDeeds(apeDeeds:any, apePriceData:any){
    addApePriceRankData(apeDeeds, apePriceData)
    eventBus.dispatch('ape-deeds-added', gApeDeeds);
}

const EXCLUDED_RESOURCE_FILTERS = [
    'Resource Direction', 'Resource Tier', 'Resource Type', 'KodaProperty'];

export function isIncludedByFilter(filterObj:any, gApeDeed:any){
    let isIncluded = true;
    if(filterObj.op === 'include'){
        if(gApeDeed[filterObj.name] || gApeDeed[filterObj.name] === 0){
            isIncluded = true;
        }
        else{
            return false;
        }
        
    }
    if(filterObj.op === 'range'){
        let filterName = filterObj.name;
        let filterVals = filterObj.valArr;
        let apeDeedVal = gApeDeed[filterName];
        if(apeDeedVal < filterVals[0] || apeDeedVal > filterVals[1] ){
            isIncluded = false;
        }
        if(!apeDeedVal && apeDeedVal != 0){
                    return false;
        }
    }
    else if(filterObj.op === 'exclude'){
        if(!gApeDeed[filterObj.name] && gApeDeed[filterObj.name] != 0){
            isIncluded = true;
                }
        else{
            return false;
        }
            }
    else if(filterObj.op === 'in'){
        if(!filterObj.valArr.includes(
            gApeDeed[filterObj.name])){
            return false;;
        }
    }
    return isIncluded;
}

export function filterApeDeeds(filtersObj:any){
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
            if(filtersObj[filterObjKey].op === 'or'){
                let orIsIncluded = false;
                for(let orFilterObj of filtersObj[filterObjKey].valArr){
                    if(isIncludedByFilter(orFilterObj, gApeDeed)){
                        orIsIncluded = true;
                        break;
                    }
                }
                isIncluded = orIsIncluded;
            }
            else{
                isIncluded = isIncludedByFilter(filtersObj[filterObjKey], gApeDeed);
            }
            if(!isIncluded){
                return false;
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
            floorPrice = apeDeed.currentListPrice;
        }
    }
    if(floorPrice == Number.MAX_SAFE_INTEGER){
        return 0;
    }
    return floorPrice;
}

export function getFloor(filteredApeDeeds?:any[]){
    if(!filteredApeDeeds){
        console.log('filteredapedeedsddsds',gApeDeeds);
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

export function getLandData(plot:number){
    for(let i=0; i<gApeDeeds.length; i++){
        if(gApeDeeds[i]['Plot'] === plot){
            return gApeDeeds[i];
        }
    }
}

export function sortApeDeeds(sortingOption:string, apeDeeds:any[]){
    const copy = _.cloneDeep(apeDeeds);
    copy.sort((a, b) => {
        if(!(a.currentListPrice)){
            return 1;
        }
        if(!b.currentListPrice){
            return -1;
        }
        if(sortingOption == SORTING_OPTION_PRICE_HIGH_TO_LOW){
            return(b.currentListPrice - a.currentListPrice)
        }
        if(sortingOption == SORTING_OPTION_PRICE_LOW_TO_HIGH){
            return(a.currentListPrice - b.currentListPrice)
        }
    })
    return copy;
}
