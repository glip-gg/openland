import React, { useEffect } from 'react';
import dynamic from 'next/dynamic'
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css'; 
//import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';
import Navbar from '../components/Navbar';

import styled from 'styled-components';

let FilterHeaderItem = styled.div`
    padding: 12px 14px;
    background:  ${props => props.active ? 'rgba(255, 255, 255, 0.06)': 'transparent'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

let FilterHeaderItemLabel = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */
    display: flex;
    align-items: center;
    color: #FFFFFF;
`;


let Title = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 21px;
    /* identical to box height */
    display: flex;
    align-items: center;
    color: #FFFFFF;
    font-weight: bold;
`;



export default function About() {
   
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
        }}>
             <Head>
                <title>Openland | Suped-up search for Otherside</title>
                <meta
                    name="description"
                    content="Navigate the otherside in a blazing fast experience"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar showSearch={false} showFloor={false} />

            <div style={{padding: 90, height: '100vh', overflow: 'auto'}}>

                <Title>About Openland:</Title>
                <br></br>
                <p>Openland is a portal in the metaverse helping voyagers easily navigate the otherside.

                    <br></br>
                    It was created by Bloo, a mutant who woke up lost in the otherside and decided to help fellow travellers on their voyagers by creating a map of the Otherside.
                    There is always an eerie silence in the Openland, but sometimes, sometimes Bloo decides to shake things up and things change in the Openland.
                </p>
                <br></br>

                <Title>About Bloo:</Title>
                <br></br>
                <p>Bloo is a mutant ape that likes only two things: Gaming and Coding.</p>
                <br></br>

                <Title>Favourite games:</Title>
                <br></br>
                <ol className='grey-list'>
                    <li> Dota 1/2 - in another metaverse Bloo would have gone Pro in Dota</li>
                    <li> WoW - his gaming keyboard is the only thing he loves more than his balanced night elf druid</li>
                    <li> Limbo - arguably his favourite indie game</li>
                    <li> GTA Vice City - he could travel the whole map with his eyes closed </li>
                    <li> Soldier of Fortune - where bloo got his first taste for shooters</li>
                </ol>
                <br></br>

                <Title>Favourite Projects:</Title>
                <br></br>
                <ol className='grey-list'>
                    <li> geth</li>
                    <li> Lighting network</li>
                    <li> zkSync</li>
                    <li> web3auth</li>
                </ol>
            </div>

        </div>
        
    );
}
