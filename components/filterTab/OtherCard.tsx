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

import koda from '../../assets/filter/land.svg';
import not_koda from '../../assets/filter/land.svg';
import artifact from '../../assets/filter/land.svg';
import not_artifact from '../../assets/filter/land.svg';
import resource from '../../assets/filter/land.svg';
import not_resource from '../../assets/filter/land.svg';


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
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    background: linear-gradient(96.93deg, #1563FB 11.38%, rgba(21, 99, 251, 0.31) 55.42%);
    border-radius: 4px;
    margin-left: 8px;
`;

const DetailsDiv = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
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
export default function OtherCard({data}: any) {    
    
    
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', margin: 20, borderBottom: '1px solid rgba(44, 44, 44, 1)', paddingBottom: 24, }}>
            <Image src={'https://lh3.googleusercontent.com/F1dsTzx4j5OyXxww6HUzeyuEXgrYxYf3apPNrU76321lMyISXWw8bzbqXlrdPiOv2aCprJKWJIudIiE75m-6pz-7dkdzOvoEBFiu3g=w600'}
        alt='' width={260} height={363} />
        <Spacer />
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <OtherID>#{data.Plot}</OtherID>
          <Price>{data.price}</Price>
        </div>
        <Spacer />

        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16, marginTop: 11}}>
          <OtherName>{data.Environment}- {data.Sediment}</OtherName>
          <Tier>{data.tier}</Tier>
        </div>

        <div style={{display: 'flex', justifyContent: 'flex-start',  marginBottom: 25}}>
          <Rank>RANK</Rank>
          <OtherRank>{data.rank}</OtherRank>
        </div>

        <div style={{display: 'flex',
                     justifyContent: 'space-between'}}>
          <DetailsDiv>Koda</DetailsDiv>
          <DetailsDiv>Artifacts</DetailsDiv>
          <DetailsDiv>0 Resources</DetailsDiv>
        </div>

        </div>
    );
}
