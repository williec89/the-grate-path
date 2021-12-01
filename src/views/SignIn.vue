<template>
    <div class="sign-in">
        <div id="firebaseui-auth-container" rounded="lg" color="white"></div>
    </div>
</template>
<script>
import { auth } from '@/firebase'
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
    mounted () {
        const uiConfig = {
            signInOptions: [
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: () => false
            }
        }

        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
        ui.start('#firebaseui-auth-container', uiConfig)
    }
}
</script>
