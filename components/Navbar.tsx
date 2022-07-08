import {useState} from 'react';
import styles from '../styles/Home.module.css';
import {
  Container,
  Text,
  Link
} from '@nextui-org/react';
import {setFocusedIds} from '../components/map/Map';
import FloorBoxComponent from './FloorBox';
import { event as GA } from "nextjs-google-analytics";

export default function Navbar({showSearch, showFloor, setBarActive, barActive}: any) {
    const [text, setText] = useState('');

    const goToMapObj = () => {
        setFocusedIds([Number(text)]);
    }

    const handleInputChange = (e: any) =>{
        setText(e.target.value);
        GA("navbar", {
          category: "search",
          label: "deed",
          value: e.target.value,
        });
    }
    
    return (
        <div style={{position: 'fixed', top: 0, zIndex: 1000, width: '100%', background: '#000'}} className={styles.container}>
          <Container
              as="main"
              display="flex"
              direction="row"
              alignItems="center"
              style={{ width: '100%', marginTop: 8, marginLeft:0, marginRight:32, paddingLeft: 8}}
          >
            <div style={{display: 'flex',
                         justifyContent: 'space-between',
                         minWidth: '100vw',
                         alignItems: 'center',
                         paddingRight: 8
            }}>
              <div style={{display: 'flex',
                           justifyContent: 'flex-start',
                           width: '100%',
                           alignItems: 'center'
              }}>
                <div style={{display: "flex", justifyContent:'center', alignItems:'center'}}>
                  {/* <Image alt='logo' src={logo} /> */}
                  <div className="nav-toggle" onClick={()=>{
                      setBarActive(!barActive)}} style={{marginLeft:10, marginRight:5}}>
                    <span className={`bar ${barActive ? "x" : ""}`}></span>
                    <span className={`bar ${barActive ? "x" : ""}`}></span>
                    <span className={`bar ${barActive ? "x" : ""}`}></span>
                  </div>
                  <Text h1 className={styles.navbar} style={{marginLeft: 8}}>         
                    <Link
                        color={'primary'}
                        href="/"
                        rel="noopener noreferrer"
                        style={{color: '#fff'}}
                        onClick={() => GA("navbar", {
                          category: "search",
                          label: "openland",
                        })}
                    >
                      OpenLand
                    </Link>                
                  </Text>
                </div>
                
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
                         placeholder="Search Deed Number"
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
                        style={{
                          width:20,
                          height:20,
                          zIndex:10,
                          cursor:'pointer'
                        }}
                        src={'/search.png'} />
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
                    onClick={() => GA("navbar", {
                      category: "search",
                      label: "discord",
                    })}
                >
                  Discord
                </Link>
                <Link
                    color={'primary'}
                    href="https://www.instagram.com/gliphouse/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{color: '#fff', marginRight: 12}}
                    onClick={() => GA("navbar", {
                      category: "search",
                      label: "instagram",
                    })}
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
                    onClick={() => GA("navbar", {
                      category: "search",
                      label: "about",
                    })}
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
