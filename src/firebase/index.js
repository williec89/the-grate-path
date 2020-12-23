// import firebase from 'firebase/app'
import * as firebase from 'firebase/app'
import { firebaseConfig } from './config'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'

const app = firebase.initializeApp(firebaseConfig)
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
