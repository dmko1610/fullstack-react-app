import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-ed814.firebaseio.com/'
});

export default instance;
