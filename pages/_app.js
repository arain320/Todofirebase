import { AuthUserProvider } from "@/firebase/auth";
import "@/styles/globals.css";
import Head from "next/head";
import favicon from "../public/todo.png";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Hasnain Todo App</title>
        <link rel="icon" href={favicon.src} sizes="any" />
      </Head>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </>
  );
}
