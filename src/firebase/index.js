// import firebase from 'firebase/app'
import * as firebase from 'firebase/app'
import { firebaseConfig } from './config'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'

const app = firebase.initializeApp(firebaseConfig)
export const db = app.firestore()

export const auth = app.auth()

export const functions = app.functions()
