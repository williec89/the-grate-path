import VueXstate from '@/helpers/VueXstate'
import { userStateMachine } from './userStateMachine'

export const $user = (window.$user = new VueXstate(userStateMachine))
$user.service.start()

export default {
    install: app => {
        app.config.globalProperties.$user = $user
    }
}
