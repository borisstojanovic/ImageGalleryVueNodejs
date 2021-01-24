import CommentsService from '../services/comments.service';

export const comments = {
    namespaced: true,
    state: {
        comments: [],
    },
    mutations: {
        set_comments: function (state, comments){
            state.comments = comments;
        },
        add_comment: function (state, comment){
            state.comments.push(comment);
        },
        remove_comment: function (state, id){
            for (let i = 0; i < state.comments.length; i++){
                if (state.comments[i].id === id){
                    state.comments.splice(i, 1);
                    break;
                }
            }
        },
        clear_comments: function (state){
            state.comments = []
        },
        update_comment: function (state, payload){
            for (let i = 0; i < state.comments.length; i++){
                if (state.comments[i].id === parseInt(payload.id)){
                    state.comments[i].user_id = payload.user_id;
                    state.comments[i].image_id = payload.image_id;
                    state.comments[i].content = payload.content;
                    break;
                }
            }
        },
    },
    actions: {
        load_comments: function ({ commit }){
            CommentsService.load_comments().then(comments => {
                commit('set_comments', comments);
                return Promise.resolve(comments);
            }).catch( err => {return Promise.reject(err);});
        },
        load_comments_for_user: function ({ commit }, user){
            CommentsService.load_comments_for_user(user).then(comments => {
                commit('set_comments', comments);
                return Promise.resolve(comments);
            }).catch( err => {return Promise.reject(err);});
        },
        load_comments_for_image: function ({ commit }, image){
            CommentsService.load_comments_for_image(image).then(comments => {
                commit('set_comments', comments);
                return Promise.resolve(comments);
            }).catch( err => {return Promise.reject(err);});
        },
        delete_comment: function ({ commit }, id){
            CommentsService.delete_comment(id).then(id => {
                commit('remove_comment', id);
                return Promise.resolve(id);
            }).catch( err => {return Promise.reject(err);});
        },
        add_comment: async function ({ commit }, comment){
            await CommentsService.add_comment(comment).then(comment => {
                commit('add_comment', comment);
                return Promise.resolve(comment);
            }).catch( err => {return Promise.reject(err);});
        },
        update_comment: async function ({ commit }, payload){
            let formData = new FormData();
            formData.append('user_id', payload.user_id);
            formData.append('content', payload.content);
            formData.append('image_id', payload.image_id);
            await CommentsService.update_comment(payload.id, formData).then(response => {
                commit('update_comment', {id: payload.id, user_id: response.data.user_id,
                    content: response.data.content, image_id: response.data.image_id})
            }).catch(err => alert(err));
        },

        clear_comments: function ({ commit }){
            commit('clear_comments')
        }

    }
};