import { Machine, assign } from 'xstate'
import { auth } from '@/firebase'

const config = {
    id: 'user',
    initial: 'starting',
    context: {
        user: null
    },
    states: {
        starting: {
            on: {
                CHANGED: [
                    {
                        target: 'no_user',
                        cond: (_, event) => !event.user
                    },
                    {
                        target: 'authenticated',
                        actions: assign({
                            user: (_, event) => event.user
                        })
                    }
                ]
            }
        },
        no_user: {
            on: {
                CHANGED: [
                    {
                        target: 'authenticated',
                        cond: (_, event) => event.user,
                        actions: assign({
                            user: (_, event) => event.user
                        })
                    }
                ]
            }
        },
        authenticated: {
            on: {
                CHANGED: [
                    {
                        target: 'no_user',
                        cond: (_, event) => !event.user
                    },
                    {
                        actions: assign({
                            user: (_, event) => event.user
                        })
                    }
                ],
                SIGNOUT: {
                    actions: () => {
                        auth.signOut()
                    }
                }
            }
        }
    }
}

export const userStateMachine = Machine(config, {
    actions: {},
    services: {},
    guards: {}
})
