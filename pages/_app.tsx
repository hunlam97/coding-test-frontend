import { GlobalContextWrapper } from "context/global.context";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import "styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const { currentUser, ...props } = pageProps;
  return (
    <ChakraProvider>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/react-draft-wysiwyg@1.12.3/dist/react-draft-wysiwyg.css"
        />
      </Head>
      <GlobalContextWrapper currentUser={currentUser}>
        <Component {...props} />
      </GlobalContextWrapper>
    </ChakraProvider>
  );
};

export default MyApp;
