<template>
    <div>
        <b-list-group>
            <div v-for="comment in currentComments" :key="comment.id">
                    <b-list-group-item>
                        <CommentItem :is-new="false" :comment="comment"></CommentItem>
                    </b-list-group-item>
            </div>
            <div v-if="loggedIn">
                <b-list-group-item>
                    <CommentItem :image_id="image_id" :is-new="true"></CommentItem>
                </b-list-group-item>
            </div>
        </b-list-group>
    </div>
</template>

<script>
import CommentItem from "./CommentItem";

export default {
    name: "CommentList",
    components: {
        CommentItem,
    },
    props: {
        image_id: Number,
    },
    mounted: function () {
        this.$store.dispatch('comments/load_comments_for_image', this.image_id);
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        currentComments() {
            return this.$store.state.comments.comments;
        },
        currentUser() {
            return this.$store.state.auth.user;
        }
    },

}
</script>

<style scoped>
tr:hover td{
    background: aquamarine;
}
</style>