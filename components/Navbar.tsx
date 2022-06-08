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
} from '@nextui-org/react';;


export default function Navbar() {
 
  return (
    <div className={styles.container}>
      

      <Container
        as="main"
        display="flex"
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ width: '100%', marginTop: 8 }}
      >
        <Text h1 className={styles.navbar}>         
          <Link
            color
            href="https://openland.gg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Openland
          </Link>          
        </Text>
        <Text h1 className={styles.navbar_sub}> 
            <Link
                color
                href="https://openland.gg"
                target="_blank"
                rel="noopener noreferrer"
                style={{marginRight: 8}}
            >
                NextUI
            </Link>
            <Link
                color
                href="https://openland.gg"
                target="_blank"
                rel="noopener noreferrer"
                >
                NextUI
            </Link>
        </Text>        
      </Container>
    </div>
  );
}
