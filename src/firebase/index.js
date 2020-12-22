// import firebase from 'firebase/app'
import * as firebase from 'firebase/app'
import { firebaseConfig } from './config'
import "firebase/auth"
import "firebase/functions"

const app = firebase.initializeApp(firebaseConfig)
import 'firebase/firestore'
export const db = app.firestore()

// import "firebase/remote-config"
// export const remoteConfig = firebase.remoteConfig()
// remoteConfig.settings = {
    //     minimumFetchIntervalMillis: 3600000,
    // }
    
export const auth = app.auth()
// export const auth = firebase.auth(app)
// console.log('auth', app.auth)
    
export const functions = app.functions()