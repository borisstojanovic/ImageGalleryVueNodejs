<template>
    <div>
        <b-container>
            <b-row>
                <b-col cm="6" >
                    <div>
                        <b-container fluid="true">
                            <ShowImage v-if="images.length" :image="image"/>
                        </b-container>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <CommentList :image_id="image.id"/>
            </b-row>
            <b-row v-if="loggedIn">
                <b-button-toolbar>
                    <b-button id="add-button" variant="primary" size="small" @click="addComment">Add Comment</b-button>
                </b-button-toolbar>
            </b-row>
        </b-container>
    </div>

</template>

<script>
import ShowImage from "../components/ShowImage";
import CommentList from "../components/CommentList";
import router from "../router";

export default {
    name: "ImageDetails",
    components: {
        ShowImage,
        CommentList,
    },
    computed: {
        images() {
            return this.$store.state.images.images;
        },
        loggedIn(){
            return this.$store.state.auth.status.loggedIn;
        },
        image: function () {
            for (let i = 0; i < this.images.length; i++) {
                if (this.images[i].id === parseInt(this.$route.params.id)) {
                    return this.images[i];
                }
            }
            return null;
        }
    },
    methods: {
        addComment: function (){
            router.push({path: `/comment/add/${this.image.id}`});
        },
    }
}
</script>

<style scoped>

</style>