import "../styles/globals.css";
import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { store } from "../store/store";
import { Provider } from "react-redux";

function MyApp({ session, Component, pageProps }) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
