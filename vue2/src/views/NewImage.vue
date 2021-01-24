<template>
    <div class="home">
        <b-container>
            <b-row>
                <b-col cm="6" >
                    <EditImage/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import EditImage from "../components/EditImage";

export default {
    name: "NewImage",
    components: {
        EditImage
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
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