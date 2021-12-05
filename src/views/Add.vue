<template>
    <div class="entries">
        <div style="display: flex">
            <div
                style="display: flex; align-items: center; flex-direction: column;"
            >
                <div class="inline">
                    I am grateful for
                    <input
                        type="textarea"
                        v-model="description"
                        @keyup.enter="submit"
                    />.
                </div>
                <div class="inline">
                    When did it happen
                    <Datepicker v-model="date" name="test"></Datepicker>
                </div>
            </div>
            <span
                style="color: #42b983; line-height: 0; font-size: 6rem; display: flex; align-items: center; padding-left: 30px; cursor: pointer"
                @click="submit"
            >
                +
            </span>
        </div>
    </div>
</template>

<script>
import { db, auth } from "@/firebase";
import Datepicker from "vue3-datepicker";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default {
    name: "Add",
    components: {
        Datepicker
    },
    data() {
        return {
            entries: [],
            date: new Date(),
            description: "",
            isSubmitting: false
        };
    },
    methods: {
        submit: function() {
            this.isSubmitting = true;

            if (this.description === "") {
                return;
            }
            setDoc(
                doc(db, "paths", auth.currentUser.uid),
                {
                    entries: [
                        { date: this.date, description: this.description },
                        ...this.entries
                    ]
                },
                { merge: true }
            )
                .then(() => {
                    this.description = "";
                    this.date = new Date();
                    this.entries = [
                        { date: this.date, description: this.description },
                        ...this.entries
                    ];
                })
                .finally(() => {
                    this.isSubmitting = false;
                });
        }
    },
    mounted: function() {
        auth.onAuthStateChanged(user => {
            getDoc(doc(db, "paths", auth.currentUser.uid))
                .then(doc => {
                    console.log(doc.data().entries);
                    if (doc.data() && doc.data().entries) {
                        this.entries = [...doc.data().entries];
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
