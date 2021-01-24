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
        this.$store.dispatch('images/load_images');
    },
}
</script>

<style scoped>

</style>