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
        add_comment: function ({ commit }, comment){
            return new Promise((resolve, reject) => {
                CommentsService.add_comment(comment).then(comment => {
                    commit('add_comment', comment);
                    resolve(comment);
                }).catch( err => {
                    reject(err);
                });
            })

        },
        update_comment: function ({ commit }, payload){
            return new Promise((resolve, reject) => {
                CommentsService.update_comment(payload.id,
                    {user_id: payload.user_id, image_id: payload.image_id, content: payload.content}).then(response => {
                    commit('update_comment', {id: payload.id, user_id: response.data.user_id,
                        content: response.data.content, image_id: response.data.image_id});
                    resolve(response)
                }).catch(err => {
                    reject(err);
                });
            })
        },

        clear_comments: function ({ commit }){
            commit('clear_comments')
        }

    }
};