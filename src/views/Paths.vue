<template>
    <div class="paths">
        <template v-for="(entry, idx) in entries" :key="idx">
            <div class="entry" v-if="entry.description.length > 0">
                <b>{{ secondsToDate(entry.date.seconds) }}</b>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {{ entry.description }}
            </div>
        </template>
    </div>
</template>

<script>
import { db, auth } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default {
    name: "Paths",
    components: {},
    data() {
        return {
            entries: []
        };
    },
    computed: {
        secondsToDate() {
            return v => {
                return new Date(v * 1000).toISOString().substr(0, 10);
            };
        }
    },
    mounted: function() {
        auth.onAuthStateChanged(user => {
            getDoc(doc(db, "paths", auth.currentUser.uid))
                .then(doc => {
                    if (doc.data() && doc.data().entries) {
                        const sortedEntries = doc
                            .data()
                            .entries.sort((a, b) =>
                                a.date.seconds > b.date.seconds ? 1 : -1
                            );
                        this.entries = [...sortedEntries];
                    } else {
                        this.entries = [];
                    }
                })
                .finally(() => {
                    console.log("=========================");
                });
        });
    }
};
</script>

<style scoped>
.paths {
    padding: 20px;
}

.entry {
    text-align: left;
    padding-left: 30px;
    border-left: 5px solid #ccc;
    line-height: 3rem;
}

.entry:before {
    content: "";
    display: block;
    border-top: 5px solid #ccc;
    position: absolute;
    width: 20px;
    margin-top: 1.3rem;
    margin-left: -1.5rem;
}

.entry:hover {
    color: black;
    background-color: #fafafa;
}

.entry:hover b {
    color: black;
}
</style>
