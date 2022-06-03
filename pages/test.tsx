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

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Openland | Supedup search for Otherside</title>
        <meta
          name="description"
          content="Navigate the otherside in a blazing fast experience"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        as="main"
        display="flex"
        direction="column"
        justify="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <Spacer />
        <Spacer />
        <Text h1 className={styles.title}>
          Welcome to&nbsp;
          <Link
            color
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </Link>
          &nbsp;&&nbsp;
          <Link
            color
            href="https://nextui.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            NextUI
          </Link>
        </Text>
        <Spacer />
        <Input clearable labelPlaceholder="Type something" />
        <Spacer />
        <Button>
          <a
            className={styles.button}
            href="https://github.com/nextui-org/nextui"
            target="_blank"
            rel="noopener noreferrer"
          >
            Show on Github
          </a>
        </Button>
      </Container>
    </div>
  );
}
