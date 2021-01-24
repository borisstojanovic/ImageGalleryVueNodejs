<template>
    <b-container fluid="true">
        <b-form>
            <b-row class="mt-2">
                <b-col sm="5">
                    <b-form-textarea v-model="newContent" placeholder="Comment"></b-form-textarea>
                </b-col>
                <b-col sm="1">
                    <b-button variant="primary" :disabled="isDisable" size="lg" @click="addNew">Save</b-button>
                    <br>
                    <b-spinner v-if="isLoading" label="Spinning"></b-spinner>
                    <br>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
import Joi from 'joi';

const scheme = Joi.object().keys({
    content: Joi.string().max(256).required()
});

export default {
    name: "EditComment",
    props: {
        comment: Object,
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        loggedIn(){
            return this.$store.state.auth.status.loggedIn;
        },
    },
    data() {
        return {
            newContent: '',
            isDisable: false,
            isLoading: false
        }
    },
    created() {
        if(!this.loggedIn){
            this.$router.push('/login');
        }
    },

    mounted: function () {
        this.newDescription = this.description;
        this.newImage = null;
        this.url = this.image;
    },
    methods: {
        add_image(image){
            this.$store.dispatch('images/add_image', image);
        },
        update_image(image){
            this.$store.dispatch('images/update_image', image);
        },
        edit_image(payload){
            this.$store.dispatch('images/edit_image', payload);
        },
        validate(value, schema) {
            const result = schema.validate(value);
            if (result.error) {
                alert(result.error.message);
                return false;
            }
            return true;
        },
        addNew: async function() {
            let user = this.currentUser;
            if(!this.validate({description: this.newDescription}, scheme)){
                return;
            }
            if(this.newImage === null && this.image === null){
                alert('Select an image!');
                return;
            }
            if(this.newImage !== null){
                if(this.newImage.type !== 'image/gif' && this.newImage.type !== 'image/jpg' &&
                    this.newImage.type !== 'image/png' && this.newImage.type !== 'image/jpeg') {
                    this.newImage = null;
                    alert('Must be an image');
                    return;
                }else if(this.newImage.size > 1024*1024*5){
                    this.newImage = null;
                    alert('File size too large');
                    return;
                }

            }
            const img = new FormData();
            img.append('owner_id', user.id);
            img.append('description', this.newDescription);
            img.append('image', this.newImage);
            if(this.isLoading){
                alert('Please Wait For Upload To Finish And Try Again');
                return;
            }
            this.isLoading = true;
            if (!this.$route.params.id)
                await this.add_image(img);
            else if(this.newImage === null)
                await this.edit_image({id: this.$route.params.id, user: user, description: this.newDescription});
            else
                await this.update_image({id: this.$route.params.id, user: user, image: this.newImage, description: this.newDescription});
            this.url = null;
            this.isLoading = false;
        },
        hasImage() {
            return !!this.url;
        }
    }
}
</script>