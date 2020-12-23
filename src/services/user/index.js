import { useMachine } from 'xstate-vue'
import { machine } from './userStateMachine'

export const $user = (window.$user = useMachine({ machine }))

export default {
    install: app => {
        app.config.globalProperties.$user = $user
    }
}
