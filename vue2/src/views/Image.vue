<template>
    <div>
        <Header/>
        <b-container>
            <b-row>
                <b-col cm="6" >
                    <div v-if="edit">
                        <EditImage :user="image.user" :description="image.description" :image="image.path"/>
                    </div>
                    <div v-else>
                        <b-container fluid="true">
                            <ShowImage v-if="images.length" :image="image"/>
                        </b-container>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cm="2" style="margin-top: 10px">
                    <b-button variant="primary" size="lg" @click="toggleEdit" v-html="edit ? 'Cancel' : 'Edit'"/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import EditImage from "../components/EditImage";
import Header from "@/components/Header";
import ShowImage from "../components/ShowImage";

export default {
    name: "Image",
    components: {
        Header,
        EditImage,
        ShowImage
    },
    data() {
        return {
            edit: false
        }
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
    created() {
        if (!this.loggedIn) {
            this.$router.push('/login');
        }
    },
    methods: {
        toggleEdit: function () {
            this.edit = !this.edit
        }
    }
}
</script>

<style scoped>

</style>