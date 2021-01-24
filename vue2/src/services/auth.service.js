import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/';


class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                    username: user.username,
                    password: user.password,
                },
                {withCredentials: true}
            )
            .then(response => {
                if (response.data) {
                    let user = response.data
                    console.log(JSON.stringify(user))
                    localStorage.setItem('user', JSON.stringify(user))
                }

                return response.data;
            });
    }

    logout() {
        return axios.get(API_URL + 'logout').then( response => {
            localStorage.removeItem('user')
            localStorage.removeItem('redir')
            return response
        })

    }

    register(user) {
        return axios.post(API_URL + 'register', {
            username: user.username,
            password: user.password,
            password2: user.password2,
        });
    }
}

export default new AuthService();