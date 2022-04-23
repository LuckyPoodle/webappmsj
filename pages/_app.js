
import "tailwindcss/tailwind.css";
import '../styles/globals.css'
import {AuthProvider} from "../context/useAuth";
import { Provider } from "../context";
import toast, { Toaster } from 'react-hot-toast';
function MyApp({ Component, pageProps }) {
  return <Provider><AuthProvider> <Component {...pageProps} /><Toaster /></AuthProvider></Provider>
 
}

export default MyApp
