<template>
    <b-card v-b-hover="setDisabled" border-variant="dark" header="Dark" align="center" style="max-width: 20rem;"  img-top>
        <b-modal class="modal-fade" :visible="isModal" id="image-modal" hide-footer>
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
            <b-list-group-item v-text="'User: ' + image.user.username"></b-list-group-item>
        </b-list-group>

        <template #footer>
            <b-button-toolbar>
                <b-button id="edit-button" variant="secondary" :hidden="isDisabled"
                          :disabled="isDisabled" size="small" @click="editImage">Edit</b-button>
                <b-button id="delete-button" variant="danger" :hidden="isDisabled"
                          :disabled="isDisabled" size="small" @click="deleteImage">Delete</b-button>
                <b-button class="invisible" size="small" :disabled="true">SPACE</b-button>
            </b-button-toolbar>
        </template>
    </b-card>
</template>

<script>
import router from "../router/index";

export default {
    name: "ImageCard",
    data(){
        return {
            url: '',
            isDisabled: true,
            isModal: false
        }
    },
    props:{
        image: Object,
    },
    mounted: function () {
        this.url = this.image.path
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        setDisabled(){
            if(this.image.user.id === this.currentUser.id) {
                this.isDisabled = !this.isDisabled;
            }
        },
        editImage: function (){
            router.push({path: `/image/${this.image.id}`});
        },
        deleteImage: function (){
            this.$store.dispatch('images/delete_image', this.image.id);
        },
        modalImage(){
            this.isModal = !this.isModal;
        }
    }
}
</script>

<style scoped>
.visible {
    visibility: visible;
}
.invisible {
    visibility: hidden;
}
</style>