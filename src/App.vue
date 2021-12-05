<template>
    <div id="nav">
        <router-link to="/">The Path</router-link> |
        <router-link to="/welcome">Create</router-link> |
        <router-link to="/add">Add</router-link> |
        <router-link to="/paths">Paths</router-link> |
        <template v-if="!state.matches('starting')">
            <router-link v-if="state.matches('no_user')" to="/signin"
                >Sign in</router-link
            >
            <a href="#" v-if="state.matches('authenticated')" @click="signout"
                >Sign out ({{ state.context.user.displayName }})</a
            >
        </template>
    </div>
    <router-view />
</template>

<script>
export default {
    computed: {
        state() {
            return this.$user.state.value
        }
    },
    methods: {
        signout() {
            this.$user.send('SIGNOUT')
        }
    }
}
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    background-color: #faf9f6;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
