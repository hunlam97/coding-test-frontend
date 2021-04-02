import Head from "next/head";
import { useRef } from "react";
import { Container, Input } from "@chakra-ui/react";

import { DynamicTextRef, DynamicText, Navigator } from "components";

import styles from "styles/Home.module.css";
import UserOnly, { getUserServerSideProps } from "hocs/UserOnly";

const Test = () => {
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
      <DynamicText ref={dynamicTextRef} />
      <Input margin="8px" color="primary" onChange={onChange} />
    </Container>
  );
};

export const getServerSideProps = getUserServerSideProps;

export default UserOnly(Test);
