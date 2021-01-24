<template>
    <div>
        <b-row v-b-hover="setDisabled">
            <label>{{comment.content}}</label>
            <b-button-toolbar>
                <b-button class="invisible" size="small" :disabled="true">SPACE</b-button>

                <b-button id="edit-button" variant="secondary" :hidden="isDisabled"
                          :disabled="isDisabled" size="small" @click="editComment">Edit</b-button>
                <b-button id="delete-button" variant="danger" :hidden="isDisabled"
                          :disabled="isDisabled" size="small" @click="deleteComment">Delete</b-button>
                <b-button class="invisible" size="small" :disabled="true">SPACE</b-button>

            </b-button-toolbar>
        </b-row>
    </div>
</template>

<script>
import router from "../router";

export default {
    name: "CommentItem",
    props: {
        comment: Object,
    },
    data() {
        return {
            isDisabled: true,
        }
    },
    computed: {
        currentUser(){
            return this.$store.state.auth.user;
        },
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    methods: {
        editComment(){
            router.push({path: `/comment/edit/${this.comment.id}`});
        },
        deleteComment(){
            this.$store.dispatch('comments/delete_comment', this.comment.id);
        },
        setDisabled(){
            if(this.loggedIn) {
                if (this.currentUser.id === this.comment.user_id) {
                    this.isDisabled = !this.isDisabled;
                }
            }
        }
    }
}
</script>

<style scoped>

</style>