import _ from  'lodash';

let gApeDeeds:any[] = [];

export async function addApeDeeds(apeDeeds:any){
  gApeDeeds = apeDeeds;
}


export async function filterApeDeeds(filtersObj:any){
    console.log(filtersObj);
    let filteredApeDeeds = _.filter(
        gApeDeeds, function(gApeDeed:any) {
            for(let filterObjKey in filtersObj){
                if(!filtersObj[filterObjKey].valArr.includes(
                    gApeDeed[filterObjKey])){
                    return false
                }
            }
            return true;
        }  
    );
    return filteredApeDeeds;
}
