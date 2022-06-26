import {useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
  Container,
  Button,
  Spacer,
  Text,
  Link
} from '@nextui-org/react';

import SearchIcon from '../assets/search.png'
import {setFocusedIds} from '../components/map/Map';
import FloorBoxComponent from './FloorBox';

export default function Navbar() {
    const [text, setText] = useState('');

    const goToMapObj = () => {
        setFocusedIds([Number(text)]);
    }

    const handleInputChange = (e) =>{
        setText(e.target.value);
    }
    
    return (
        <div style={{position: 'fixed', top: 0, zIndex: 1000, width: '100%', background: '#000'}} className={styles.container}>
          <Container
              as="main"
              display="flex"
              direction="row"
              alignItems="center"
              style={{ width: '100%', marginTop: 8, marginLeft:32, marginRight:32}}
          >
            <div style={{display:'flex',
                         justifyContent:'center',
                         alignItems:'center'}}>
              <Text h1 className={styles.navbar}>         
                <Link
                    color={'primary'}
                    href="https://openland.gg"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{color: '#fff'}}
                >
                  Openland
                </Link>
                
              </Text>
              <div style={{
                  border: "none",
                  background: "#000033",
                  padding:10,
                  display:'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft:54
              }}>
                <input style={{
                    border:'none',
                    color:'white',
                    background: "transparent", }}
                       onChange={(ev)=>handleInputChange(ev) }
                       type="number"
                       value={text}
                       placeholder="Search Plot Number"
                       onKeyPress={event => {
                           if (event.key === 'Enter') {
                               goToMapObj()
                           }
                       }}
                />
                <div className="shine-wrap">
                  <img
                      onClick={()=>{goToMapObj()}}
                      style={{width:20, height:20, zIndex:10,
                              cursor:'pointer'}} src={'/search.png'} />
                </div>
              </div>
            </div>
            <FloorBoxComponent></FloorBoxComponent>
          </Container>
        </div>
    );
}
