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

export default function Navbar({showSearch, showFloor}: any) {
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
            <div style={{display: 'flex',
                         justifyContent: 'space-between',
                         width: '100%',
                         alignItems: 'center'
                }}>

            
              <div style={{display: 'flex',
                          justifyContent: 'flex-start',
                          width: '100%',
                          alignItems: 'center'
                  }}>
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
                {showSearch && <div style={{
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
                        alt='search'
                        onClick={()=>{goToMapObj()}}
                        width='20'
                        height='20'
                        style={{width:20, height:20, zIndex:10,
                              cursor:'pointer'}} src={'/search.png'} />
                  </div>
                </div>}
              </div>
              <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%'}}>
                
                <Link
                      color={'primary'}
                      href="https://discord.gg/ESHQtDxpyS"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{color: '#fff', marginRight: 12}}
                  >
                    Discord
                  </Link>
                  <Link
                      color={'primary'}
                      href="https://www.instagram.com/gliphouse/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{color: '#fff', marginRight: 12}}
                  >
                    Instagram
                  </Link>
                  <Link
                      color={'primary'}
                      href="https://twitter.com/bloomutant"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{color: '#fff', marginRight: 12}}
                  >
                    Twitter
                  </Link>             
                  <Link
                      color={'primary'}
                      href="/about"
                      rel="noopener noreferrer"
                      style={{color: '#fff', marginRight: 12}}
                  >
                    About
                  </Link>
                  {showFloor && <FloorBoxComponent />}
                </div>
              </div>
          </Container>
        </div>
    );
}
