import axios from 'axios'
import firebase from '../auth/initFirebase'

//if dunnid send token then use this
export const axiosPublic = axios.create({
  baseURL: process.env.api
    ? process.env.api
    : 'https://coral-app-ss6jg.ondigitalocean.app/api',
})

export const axiosAuth = axios.create({
  baseURL: process.env.api
    ? process.env.api
    : 'https://coral-app-ss6jg.ondigitalocean.app/api',
})

axiosAuth.interceptors.request.use(
  async (config) => {
    let user = await firebase.auth().currentUser
    config.headers.token = user ? await user.getIdToken(true) : ''
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
