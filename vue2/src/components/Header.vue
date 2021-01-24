<template>
    <div>
        <b-jumbotron header="Gallery" :lead="'Num Images: ' + images.length"></b-jumbotron>
    </div>
</template>

<script>

export default {
    name: "Header",
    computed:{
        images() {
            return this.$store.state.images.images;
        },
    },
}
</script>

<style scoped>

</style>