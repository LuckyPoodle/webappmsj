import axios from "axios";
import firebase from "../firebase";


//if dunnid send token then use this
export const axiosPublic = axios.create({
  baseURL: process.env.api,
});

export const axiosAuth = axios.create({
  baseURL: process.env.api,
});

axiosAuth.interceptors.request.use(
  async (config) => {
    let user = await firebase.auth().currentUser;
    config.headers.token = user ? await user.getIdToken(true) : "";
    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);
