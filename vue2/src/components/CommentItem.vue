<template>
    <div v-if="isNew">
        <b-row v-b-hover="setDisabled">
            <b-textarea v-model="newContent"/>
            <b-button-toolbar>
                <b-button class="invisible" size="small" :disabled="true">SPACE</b-button>
                <b-button id="add-button" variant="primary" :hidden="isDisabled"
                              :disabled="isDisabled" size="small" @click="addComment">Save</b-button>
                <b-button class="invisible" size="small" :disabled="true">SPACE</b-button>
            </b-button-toolbar>
        </b-row>
        <b-row v-if="message">
            <label>{{message}}</label>
        </b-row>
    </div>
    <div v-else>
        <b-row v-b-hover="setDisabled">
            <b-textarea v-model="newContent" :disabled="isNotEditable"/>
            <b-button-toolbar>
                <b-button class="invisible" size="small" :disabled="true">SPACE</b-button>
                <div v-if="isNotEditable">
                    <b-button id="edit-button" variant="secondary" :hidden="isDisabled"
                              :disabled="isDisabled" size="small" @click="editComment">Edit</b-button>
                    <b-button id="delete-button" variant="danger" :hidden="isDisabled"
                              :disabled="isDisabled" size="small" @click="deleteComment">Delete</b-button>
                </div>
                <div v-else>
                    <b-button id="save-button" variant="primary" :hidden="isDisabled"
                              :disabled="isDisabled" size="small" @click="saveComment">Save</b-button>
                    <b-button id="cancel-button" variant="secondary" :hidden="isDisabled"
                              :disabled="isDisabled" size="small" @click="cancelEdit">Cancel</b-button>
                </div>
                <b-button class="invisible" size="small" :disabled="true">SPACE</b-button>
            </b-button-toolbar>
        </b-row>
        <b-row v-if="message">
            <label>{{message}}</label>
        </b-row>
    </div>
</template>

<script>

import Joi from 'joi';

const scheme = Joi.object().keys({
    content: Joi.string().max(256).required()
});


export default {
    name: "CommentItem",
    props: {
        comment: Object,
        isNew: Boolean,
        image_id: Number
    },
    data() {
        return {
            isDisabled: true,
            isNotEditable: true,
            newContent: '',
            message: '',
        }
    },
    computed: {
        currentUser(){
            return this.$store.state.auth.user;
        },
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    mounted() {
        if(this.comment) {
            this.newContent = this.comment.content.substr(0);
        }
    },
    methods: {
        validate(value, schema) {
            const result = schema.validate(value);
            if (result.error) {
                this.message = result.error;
                return false;
            }
            return true;
        },
        editComment(){
            this.isNotEditable = false;
        },
        deleteComment(){
            this.$store.dispatch('comments/delete_comment', this.comment.id);
        },
        cancelEdit(){
            this.isNotEditable = true;
            this.newContent = this.comment.content;
        },
        async saveComment(){
            if(!this.validate({content: this.newContent}, scheme)){
                return;
            }
            await this.$store.dispatch('comments/update_comment',
                {user_id: this.comment.user_id, image_id: this.comment.image_id, content: this.newContent, id: this.comment.id})
                .then(response => {
                    console.log(response.data);
            }).catch(err => {
                this.newContent = this.comment.content.substr(0);
                this.message = err.message;
            });
            this.message = '';
            this.isNotEditable = true;
        },
        async addComment(){
            if(!this.validate({content: this.newContent}, scheme)){
                return;
            }
            await this.$store.dispatch('comments/add_comment',
                {user_id: this.currentUser.id, image_id: this.image_id, content: this.newContent})
                .then(response => {
                    this.comment = response.data;
                }).catch(err => {
                    this.message = err.message;
                });
            this.message = '';
            this.newContent = '';
        },
        setDisabled(){
            if(this.loggedIn) {
                if(this.isNew){
                    this.isDisabled = !this.isDisabled;
                }
                else if (this.currentUser.id === this.comment.user_id) {
                    this.isDisabled = !this.isDisabled;
                }
            }
        }
    }
}
</script>

<style scoped>

</style>