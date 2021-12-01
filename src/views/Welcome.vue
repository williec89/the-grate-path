<template>
    <div class="entries">
        <div style="display: flex">
            <div style="display: flex; align-items: center; flex-direction: column;">
                <div class="inline">
                    I am grateful for <input type="textarea" v-model="description" @keyup.enter="submit">.
                </div>
                <div class="inline">
                    When did it happen <Datepicker v-model="date" name="test"></Datepicker>
                </div>
            </div>
            <span style="color: #42b983; line-height: 0; font-size: 6rem; display: flex; align-items: center; padding-left: 30px; cursor: pointer" @click="submit">
                +
            </span>
        </div>
    </div>
</template>

<script>
import { db, auth } from '@/firebase'
import Datepicker from 'vue3-datepicker'

export default {
    name: 'Welcome',
    components: {
        Datepicker
    },
    data () {
        return {
            entries: [],
            date: new Date(),
            description: '',
            isSubmitting: false
        }
    },
    methods: {
        submit: function () {
            this.isSubmitting = true

            if (this.description === '') {
                return
            }

            db.collection('paths').doc(auth.currentUser.uid)
                .set(
                    { entries: [{ date: this.date, description: this.description }, ...this.entries] },
                    { merge: true }
                )
                .then(() => {
                    this.description = ''
                    this.date = new Date()
                    this.entries = [{ date: this.date, description: this.description }, ...this.entries]
                })
                .finally(() => {
                    this.isSubmitting = false
                })
        }
    },
    mounted: function () {
        auth.onAuthStateChanged((user) => {
            db.collection('paths').doc(auth.currentUser.uid).get()
                .then((doc) => {
                    if (doc.data() && doc.data().entries) {
                        this.entries = doc.data().entries
                    } else {
                        this.entries = []
                    }
                }).finally(() => {
                    console.log('=========================')
                })
        })
    }
}
</script>

<style>

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
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
    background-color: transparent;
}

input:focus {
    border: none;
    border-bottom: 2px solid #aaa;
    padding-bottom: 6px;
    outline: none;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
}

.v3dp__datepicker {
    display: inline-block;
}
</style>
