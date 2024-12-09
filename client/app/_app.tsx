import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "756839707047-igc5iknel4c28jmnqsistaqs0fbm4a1b.apps.googleusercontent.com";

function MyApp({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}

export default MyApp;
