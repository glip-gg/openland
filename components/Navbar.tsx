import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
  Container,
  Button,
  Input,
  Spacer,
  Text,
  Link
} from '@nextui-org/react';



export default function Navbar() {
 
  return (
    <div style={{position: 'fixed', top: 0, zIndex: 1000, width: '100%', background: '#000'}} className={styles.container}>
      

      <Container
        as="main"
        display="flex"
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ width: '100%', marginTop: 8}}
      >
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
        <Input placeholder="Search" />
        <Text h1 className={styles.navbar_sub}> 
            <Link
                color={'primary'}
                href="https://openland.gg"
                target="_blank"
                rel="noopener noreferrer"
                style={{marginRight: 8, color: '#fff'}}
                
            >
                Twitter
            </Link>
            <Link
                color={'primary'}
                href="https://openland.gg"
                target="_blank"
                rel="noopener noreferrer"
                style={{marginRight: 8, color: '#fff'}}
                >
                Discord
            </Link>
            <Link
                color={'primary'}
                href="https://openland.gg"
                target="_blank"
                rel="noopener noreferrer"
                style={{color: '#fff'}}
                >
                About
            </Link>
        </Text>        
      </Container>
    </div>
  );
}
