<template>
    <div id="nav">
        <router-link to="/">Paths</router-link> |
        <router-link to="/add">Add</router-link>
        <template v-if="!state.matches('starting')">
            |
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

* {
    font-size: 1.4rem;
    color: #999;
}

.inline {
    display: block;
}

.inline:first-child {
    margin-bottom: 2rem;
}

.entries {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 89vh;
}

input {
    border: none;
    border-bottom: 7px solid #999;
    text-align: center;
    transition: all 200ms;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box; /* Firefox, other Gecko */
    box-sizing: border-box; /* Opera/IE 8+ */
    background-color: transparent;
}

input:focus {
    border: none;
    border-bottom: 2px solid #aaa;
    padding-bottom: 6px;
    outline: none;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box; /* Firefox, other Gecko */
    box-sizing: border-box; /* Opera/IE 8+ */
}

.v3dp__datepicker {
    display: inline-block;
}
</style>
