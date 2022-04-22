
import "tailwindcss/tailwind.css";
import '../styles/globals.css'
import {AuthProvider} from "../auth/useAuth";
import { ToastContainer } from "react-toastify";
function MyApp({ Component, pageProps }) {
  return <AuthProvider> <ToastContainer /><Component {...pageProps} /></AuthProvider>
 
}

export default MyApp
