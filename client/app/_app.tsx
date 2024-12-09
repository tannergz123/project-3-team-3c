import { GoogleOAuthProvider } from "@react-oauth/google";

function MyApp({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider
      clientId={
        "756839707047-igc5iknel4c28jmnqsistaqs0fbm4a1b.apps.googleusercontent.com"
      }
    >
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}

export default MyApp;
