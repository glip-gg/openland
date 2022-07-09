import styled from 'styled-components';
import { useState } from 'react';
import Image from 'next/image';
import Avatar from 'rsuite/Avatar';
import { Spacer } from '@nextui-org/react';
// import koda from '../../assets/filter/koda.svg';
// import not_koda from '../../assets/filter/not_koda.svg';
// import artifact from '../../assets/filter/artifact.svg';
// import not_artifact from '../../assets/filter/not_artifact.svg';
// import resource from '../../assets/filter/resource.svg';
// import not_resource from '../../assets/filter/not_resource.svg';

import {setFocusedIds} from '../map/Map';
import EtherSymbol from '../../assets/currency/ether.svg';
import opensea from '../../assets/opensea.svg';


const OtherID = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #FFFFFF;

    opacity: 0.4;
`;


const Price = styled.div`
    
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    /* identical to box height, or 113% */

    display: flex;
    align-items: center;

    color: #FFFFFF;
`;


const OtherName = styled.div`
    
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    /* identical to box height, or 113% */

    display: flex;
    align-items: center;

    color: #FFFFFF;
`;


const Tier = styled.div`    
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    /* identical to box height, or 113% */
    display: flex;
    align-items: center;
    color: #FFFFFF;
`;


const Rank = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
`;

const OtherRank = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: white;
    padding: 2px 4px;
    border-radius: 4px;
    border-radius: 4px;
    margin-left: 8px;
`;

const DetailsDiv = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    text-transform: uppercase;
    color: white;
    align-items: center;
`;


const ItemImage = (src: any) => {
    return (
        <div style={{marginRight: 20}}>
          <Image src={src.src} alt='' />
        </div>
    );
}
const RESOURCE_LIST = [
    'Eastern Resource',
    'Northern Resource',
    'Southern Resource',
    'Western Resource',
]

/* 
   9 properties of land card
   - image
   - id
   - price
   - name
   - tier
   - rank
   - koda
   - artifact
   - resource
 */
const Icon = ({icon, margin}: any) => {
    return (
    <div style={{marginRight: margin ? 0: 10}}>
        <Image  width='20' height='20' alt='' src={icon} />
    </div>
    );
}


const replaceAt = (str:string, index:number, replacement:string) => {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

export default function OtherCard({data}: any) {   

    const focusInMap = ()=>{
        console.log('focusing plot', data.Plot)
        setFocusedIds([data.Plot]);
    }
    const getRankPercentage = (rank:any)=>{
        let rankPercentage = Number(rank) *100/100000;
        if(rankPercentage>1){
            rankPercentage = Math.floor( rankPercentage );
        }
        else{
            rankPercentage = 1;
        }
        console.log(data.Plot, rankPercentage);
        let rankPercentageString = '';
        if(rankPercentage){
            let rankStr = rankPercentage.toString();
            // Replace the 0 with empty string
            let res;
            if(rankStr.length >1){
                let unitStringPos = rankStr.length-1;
                console.log(unitStringPos, rankStr);
                res = replaceAt(rankStr, unitStringPos, '0');
            }
            else
                res = rankStr;
            rankPercentageString = `Top ${res}%`
        }
        return rankPercentageString;         
    }

    const getNumResources = () =>{
        let numResources = 0;
        for(let resource of RESOURCE_LIST){
            if(data[resource]){
                numResources++;
            }
        }
        return numResources;
    }
    
    const rankPercentageString = getRankPercentage(data.rank)
    const numKodas = data.Koda? 1: 0
    const numArtifacts = data.Artifact? 1: 0;
    const numResources = getNumResources();
    let currentListPrice = data.currentListPrice;
    if(isNaN(currentListPrice)){
        currentListPrice = false;
    }
        return (
            <div className='hover' style={{display: 'flex', flexDirection: 'column', margin: 10, borderBottom: '1px solid rgba(44, 44, 44, 1)', paddingBottom: 24, }} onClick={()=> {focusInMap()}}>
              
              <Image src={`https://live-nft-hosted-assets.s3.ap-south-1.amazonaws.com/otherside/land-images/${data.Plot}.jpeg`}
                     alt='https://lh3.googleusercontent.com/F1dsTzx4j5OyXxww6HUzeyuEXgrYxYf3apPNrU76321lMyISXWw8bzbqXlrdPiOv2aCprJKWJIudIiE75m-6pz-7dkdzOvoEBFiu3g=w600' width={260} height={363} />
              <Spacer />
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <OtherID>#{data.Plot}</OtherID>
                {(currentListPrice) ? (
                    <div style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                      <Price style={{marginRight:10}}>{currentListPrice}Ξ</Price>
                      {/* <Icon  margin={false} icon={EtherSymbol} /> */}
                      <a rel='noreferrer' href={`https://opensea.io/assets/ethereum/0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258/${data.Plot}`} target="_blank">
                          <Icon margin={true} icon={opensea} />
                      </a>
                      
                    </div>
                ) : <a rel='noreferrer' href={`https://opensea.io/assets/ethereum/0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258/${data.Plot}`} target="_blank">
                    <Icon margin={true} icon={opensea} />
                </a>
            }
              </div>
              <Spacer />

              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16, marginTop: 11}}>
                <OtherName>{data.Environment}- {data.Sediment}</OtherName>
                <Tier>{data.tier}</Tier>
              </div>

              <div style={{display: 'flex', justifyContent: 'flex-start',  marginBottom: 25}}>
                <Rank>RANK</Rank>
                <OtherRank>{data.rank}-{rankPercentageString}</OtherRank>
              </div>

              <div style={{display: 'flex',
                           justifyContent: 'space-between'}}>
                {numKodas > 0 && <DetailsDiv>{numKodas}x Koda</DetailsDiv>}
                {numArtifacts > 0 && <DetailsDiv>{numArtifacts}x Artifact</DetailsDiv>}
                {numResources > 0 && <DetailsDiv>{numResources}x Resource</DetailsDiv>}
              </div>

            </div>
        );
}
