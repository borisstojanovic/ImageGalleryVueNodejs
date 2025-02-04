import ImagesService from '../services/images.service';

export const images = {
    namespaced: true,
    state: {
        images: [],
    },
    mutations: {
        set_images: function (state, images){
            state.images = images;
        },
        add_image: function (state, image){
            state.images.push(image);
        },
        remove_image: function (state, id){
            for (let i = 0; i < state.images.length; i++){
                if (state.images[i].id === id){
                    state.images.splice(i, 1);
                    break;
                }
            }
        },
        clear_images: function (state){
            state.images = []
        },
        update_image: function (state, payload){
            for (let i = 0; i < state.images.length; i++){
                if (state.images[i].id === parseInt(payload.id)){
                    state.images[i].user = payload.user;
                    state.images[i].description = payload.description;
                    state.images[i].path = payload.path;
                    break;
                }
            }
        },
        edit_image: function (state, payload){
            for (let i = 0; i < state.images.length; i++){
                if (state.images[i].id === parseInt(payload.id)){
                    state.images[i].user = payload.user;
                    state.images[i].description = payload.description;
                    break;
                }
            }
        }
    },
    actions: {
        load_images: function ({ commit }){
            ImagesService.load_images().then(images => {
                commit('set_images', images);
                return Promise.resolve(images);
            }).catch( err => {return Promise.reject(err);});
        },
        load_images_for_user: function ({ commit }, user){
            ImagesService.load_images_for_user(user).then(images => {
                commit('set_images', images);
                return Promise.resolve(images);
            }).catch( err => {return Promise.reject(err);});
        },
        delete_image: function ({ commit }, id){
            ImagesService.delete_image(id).then(id => {
                commit('remove_image', id);
                return Promise.resolve(id);
            }).catch( err => {return Promise.reject(err);});
        },
        add_image: function ({ commit }, image){
            return new Promise((resolve, reject) => {
                ImagesService.add_image(image).then(image => {
                    commit('add_image', image);
                    resolve(image);
                }).catch( (err) => {
                    alert(err);
                    reject(err);
                });
            })

        },
        update_image: function ({ commit }, payload){
            return new Promise((resolve, reject) => {
                ImagesService.update_image(payload.id, payload.img).then(response => {
                    commit('update_image', {id: payload.id, user: response.data.user,
                        description: response.data.description, path: response.data.path});
                    resolve(response);
                }).catch(err =>{
                    alert(err);
                    reject(err);
                });
            })

        },

        edit_image: function ({ commit }, payload){
            return new Promise((resolve, reject) => {
                ImagesService.edit_image(payload.id, payload.img).then(response => {
                    commit('edit_image', {id: payload.id, user: response.data.user,
                        description: response.data.description});
                    resolve(response);
                }).catch(err => {
                    alert(err);
                    reject(err);
                });
            })
        },

        clear_images: function ({ commit }){
            commit('clear_images')
        }

    }
};