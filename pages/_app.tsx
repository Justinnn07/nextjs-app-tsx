import "../styles/globals.css";
import type { AppProps } from "next/app";
import DataLayer from "./../context/DataLayer";
import reducer, { initialState } from "./../context/reducer";

// app page
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataLayer initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </DataLayer>
  );
}

export default MyApp;
