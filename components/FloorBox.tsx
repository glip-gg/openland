import {useEffect, useState} from 'react';
import styled from 'styled-components';
import eventBus from '../utils/eventBus';
import {getFloor} from '../utils/apeDeedsModelManager';

const FloorBoxDiv = styled.div`

`

const FloorTextSpan = styled.span`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    display: flex;
    align-items: center;
    color: #000000;
`
export default function FloorBoxComponent(props:any){

    const [floor, setFloor] = useState(0);
    useEffect(()=>{
        let newData:any;
        
        eventBus.on("new-filtered-data", async (data:any)=>{
            setFloor(getFloor(data));
        });
        eventBus.on("ape-deeds-added", async (data:any)=>{
            setFloor(getFloor(data));
        });
        
    });
    return (
        <FloorBoxDiv style={{
            display: 'flex',
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 12px",
            gap: "33px",
            position: "absolute",
            width: "153px",
            height: "44px",
            left: "1241px",
            top: "15px",
            background: "#FFFFFF",
            borderRadius: "12px"}}>
          <FloorTextSpan>
            Floor: {floor} ETH
          </FloorTextSpan>
        </FloorBoxDiv>
    );
}
