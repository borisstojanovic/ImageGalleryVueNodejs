<template>
    <div>
        <b-row v-for="images in formattedImages" :key="images">
            <b-card-group deck v-for="image in images" :key="image.id">
                <ImageCard :image="image"></ImageCard>
            </b-card-group>
        </b-row>
    </div>
</template>

<script>
import ImageCard from "./ImageCard";

export default {
    name: "ImageList",
    components: {
      ImageCard
    },
    computed: {
        images() {
            return this.$store.state.images.images;
        },
        formattedImages() {
            console.log(this.images)
            return this.images.reduce((c, n, i) => {
                if (i % 3 === 0) c.push([]);
                c[c.length - 1].push(n);
                return c;
            }, []);
        }
    },
    data(){
        return {
            fields: [
                { key: 'user'},
                { key: 'description'},
                { key: 'path'},
                { key: 'action'}
            ]
        }
    },
}
</script>

<style scoped>
tr:hover td{
    background: aquamarine;
}
</style>