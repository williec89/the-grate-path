<template>
    <div class="sign-in">
        <div id="firebaseui-auth-container" rounded="lg" color="white"></div>
    </div>
</template>
<script>
import { auth } from '@/firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { GoogleAuthProvider } from 'firebase/auth'

export default {
    mounted() {
        const uiConfig = {
            signInOptions: [new GoogleAuthProvider().PROVIDER_ID],
            callbacks: {
                signInSuccessWithAuthResult: () => false
            }
        }

        const ui =
            firebaseui.auth.AuthUI.getInstance() ||
            new firebaseui.auth.AuthUI(auth)
        ui.start('#firebaseui-auth-container', uiConfig)
    }
}
</script>
