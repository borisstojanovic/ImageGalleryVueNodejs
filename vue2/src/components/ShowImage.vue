<template>
    <b-container fluid>
    <b-card border-variant="dark" header="Dark" align="center" style="max-width: 40rem;"  img-top>
        <b-modal :visible="isModal" id="image-modal" hide-footer>
            <template #modal-title>
                User: {{image.user.username}}
            </template>
            <div class="d-block text-center">
                <b-img fluid :src="url"></b-img>
            </div>
            <b-button class="mt-3" block @click="modalImage">Close Me</b-button>
        </b-modal>
        <template #header>
            <b-link :href="url" target="_blank" class="card-link">Image Link</b-link>
        </template>
        <b-card-img @click="modalImage" style="cursor:pointer" :src="url" img-alt="Image"></b-card-img>
        <b-list-group>
            <b-list-group-item v-text="image.description"></b-list-group-item>
            <b-list-group-item v-text="'Date added: ' + image.time"></b-list-group-item>
            <b-list-group-item v-text="'User: ' + image.user.username"></b-list-group-item>
        </b-list-group>
    </b-card>
    </b-container>
</template>

<script>
export default {
    name: "ShowImage",
    props: {
        image: Object
    },
    data(){
        return{
            isModal: false,
            url: ''
        }
    },
    mounted: function () {
        this.url = this.image.path
    },
    methods:{
        modalImage(){
            this.isModal = !this.isModal;
        }
    }
}
</script>

<style scoped>

</style>