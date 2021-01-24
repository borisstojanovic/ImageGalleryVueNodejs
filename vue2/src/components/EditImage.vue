<template>
    <b-container fluid="true">
        <b-form>
            <b-row class="mt-2">
                <b-col sm="2" offset="2">
                    <b-input v-model="newUser" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Username"></b-input>
                </b-col>
                <b-col sm="5">
                    <b-form-textarea v-model="newDescription" placeholder="Description"></b-form-textarea>
                </b-col>
                <b-col sm="2">
                    <b-form-file accept="image/jpeg, image/gif, image/png, image/jpg" v-model="newImage" :state="Boolean(newImage)"
                                 placeholder="Select image" drop-placeholder="Drop image">
                    </b-form-file>
                </b-col>
                <b-col sm="1">
                    <b-button variant="primary" :disabled="isDisable" size="lg" @click="addNew">Save</b-button>
                    <br>
                    <b-spinner v-if="isLoading" label="Spinning"></b-spinner>
                    <br>
                </b-col>
            </b-row>
            <b-row class="mt-2" align-content="center">
                <b-img v-if="hasImage" :v-model="newImage" :src="url" class="center" style="max-width: 30rem;" fluid block
                       rounded="true"></b-img>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
import { mapActions } from 'vuex';
import Joi from 'joi';

const scheme = Joi.object().keys({
    user: Joi.string().trim().min(3).max(12).required(),
    description: Joi.string().max(128).required()
});

const base64Encode = data =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

export default {
    name: "EditImage",
    props: {
        user: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        image: {
            type: undefined,
            default: null
        }
    },
    data() {
        return {
            newUser: '',
            newDescription: '',
            newImage: null,
            url: '',
            isDisable: false,
            isLoading: false
        }
    },
    watch: {
        newImage(newValue, oldValue) {
            if (newValue !== oldValue) {
                if (newValue) {
                    base64Encode(newValue)
                        .then(value => {
                            this.url = value;
                        })
                        .catch(() => {
                            this.url = null;
                        });
                } else {
                    this.url = null;
                }
            }
        }
    },
    mounted: function () {
        this.newUser = this.user;
        this.newDescription = this.description;
        this.newImage = null;
        this.url = this.image;
    },
    methods: {
        ...mapActions(['add_image', 'update_image', 'edit_image']),

        validate(value, schema) {
            const result = schema.validate(value);
            if (result.error) {
                alert(result.error.message);
                return false;
            }
            return true;
        },
        addNew: async function() {
            if(!this.validate({user: this.newUser, description: this.newDescription}, scheme)){
                return;
            }
            if(this.newImage === null && this.image === null){
                alert('Select an image!');
                return;
            }
            if(this.newImage !== null){
                console.log(this.newImage)
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
            img.append('user', this.newUser);
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
                await this.edit_image({id: this.$route.params.id, user: this.newUser,
                    description: this.newDescription});
            else
                await this.update_image({id: this.$route.params.id, image: this.newImage,
                    user: this.newUser, description: this.newDescription});

            this.newUser = '';
            this.newDescription = '';
            this.newImage = null;
            this.url = null;
            this.isLoading = false;
        },
        hasImage() {
            return !!this.url;
        }
    }
}
</script>

<style scoped>
.center {
    position: relative;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>