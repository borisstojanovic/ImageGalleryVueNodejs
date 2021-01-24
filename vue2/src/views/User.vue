<template>
    <div class="home">
        <Header/>
        <b-container>
            <b-row>
                <b-col cm="6" >
                    <ImageList/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Header from "../components/Header";
import ImageList from "../components/ImageList";
export default {
    name: "Home",
    components:{
        Header,
        ImageList
    },
    mounted: function () {
        if (!this.loggedIn) {
            this.$router.push('/login');
            return;
        }
        this.$store.dispatch('images/load_images_for_user', this.currentUser.id);
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    created() {
        if (!this.loggedIn) {
            this.$router.push('/login');
        }
    },
}
</script>

<style scoped>

</style>