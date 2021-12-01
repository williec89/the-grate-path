<template>
    <div class="home">
        <template v-for="(entry, idx) in entries" :key="idx">
            <div >
                {{ entry.description }}
                {{ entry.date }}
            </div>
        </template>
    </div>
</template>

<script>
import { db, auth } from '@/firebase'

export default {
    name: 'Home',
    components: {},
    data () {
        return {
            entries: []
        }
    },
    mounted: function () {
        auth.onAuthStateChanged((user) => {
            db.collection('paths').doc(auth.currentUser.uid).orderBy('date').get()
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
