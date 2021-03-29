import Head from "next/head";
import { useRef } from "react";
import { Container, Input } from "@chakra-ui/react";

import DynamicText, { DynamicTextRef } from "components/DynamicText";
import styles from "styles/Home.module.css";

const Home = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.target.value);
  };

  const dynamicTextRef = useRef<DynamicTextRef>();

  return (
    <Container className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DynamicText ref={dynamicTextRef} />
        <Input onChange={onChange} />
      </main>
    </Container>
  );
};

export default Home;
