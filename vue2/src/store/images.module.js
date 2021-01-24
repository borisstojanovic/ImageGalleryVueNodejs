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
                console.log(images)
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
        add_image: async function ({ commit }, image){
            await ImagesService.add_image(image).then(image => {
                commit('add_image', image);
                return Promise.resolve(image);
            }).catch( err => {return Promise.reject(err);});
        },
        update_image: async function ({ commit }, payload){
            let formData = new FormData();
            formData.append('owner_id', payload.user.id);
            formData.append('description', payload.description);
            formData.append('image', payload.image);
            await ImagesService.update_image(payload.id, formData).then(response => {
                commit('update_image', {id: payload.id, user: response.data.user,
                    description: response.data.description, path: response.data.path})
            }).catch(err => alert(err));
        },

        edit_image: async function ({ commit }, payload){
            let formData = new FormData();
            formData.append('owner_id', payload.user.id);
            formData.append('description', payload.description);
            await ImagesService.edit_image(payload.id, formData).then(response => {
                commit('edit_image', {id: payload.id, user: response.data.user,
                    description: response.data.description})
            }).catch(err => alert(err));
        },

        clear_images: function ({ commit }){
            commit('clear_images')
        }

    }
};