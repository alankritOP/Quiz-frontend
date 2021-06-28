import axios from 'axios';
import store from '@/store';

axios.interceptors.request.use(
    request => {
        if( request.url.includes( 'testPage' ) ) {
            request.headers['Authorization'] = `Bearer ${store.state.auth.token}`;
        }

        return request;
    },
    error => Promise.reject( error )
);