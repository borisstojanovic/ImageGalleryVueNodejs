import axios from 'axios';

const API_URL = 'http://localhost:8080/comments/';


class CommentsService {
    load_comments() {
        return axios.get(API_URL + 'all')
            .then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
    }

    load_comments_for_user(user) {
        return axios.get(API_URL + 'user/' + user)
            .then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
    }

    load_comments_for_image(image) {
        return axios.get(API_URL + 'image/' + image)
            .then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
    }

    delete_comment(id) {
        return axios.delete(API_URL + 'comment/' + id, {withCredentials: true}).then( response => {
            return response.data.id;
        }).catch(err => {
            return err;
        })
    }

    add_comment(comment){
        return axios.post(API_URL + 'comment', comment, {withCredentials: true}).then(response => {
            return response.data;
        }).catch(err => {
            return err;
        })
    }

    update_comment(id, comment){
        return axios.put(API_URL + 'edit/' + id, {
            user_id: comment.user_id,
            image_id: comment.image_id,
            content: comment.content
        }, {withCredentials: true}).then( response => {
            return response
        }).catch( err => {
            return err
        })
    }

}

export default new CommentsService();