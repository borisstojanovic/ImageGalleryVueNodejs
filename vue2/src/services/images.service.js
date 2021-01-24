import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';


class ImagesService {
    load_images() {
        return axios.get(API_URL + 'images')
            .then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
    }

    delete_image(id) {
        return axios.delete(API_URL + 'image/' + id, {withCredentials: true}).then( response => {
            return response.data.id;
        }).catch(err => {
            return err;
        })
    }

    add_image(image){
        return axios.post(API_URL + 'images', {image: image}, {withCredentials: true}).then(response => {
            return response.data;
        }).catch(err => {
            return err;
        })
    }

    update_image(id, formData){
        return axios.put(API_URL + 'image/' + id, formData, {withCredentials: true}).then( response => {
            return response
        }).catch( err => {
            return err
        })
    }

    edit_image(id, formData){
        return axios.put(API_URL + 'edit/' + id, formData, {withCredentials: true}).then( response => {
            return response
        }).catch( err => {
            return err
        })
    }
}

export default new ImagesService();