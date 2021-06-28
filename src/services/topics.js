import axios from 'axios';
const KEY_TOKEN = "token";

import { successHandler, errorHandler } from './helper';

const getTopics = () =>{
    return axios.get(`http://localhost:3000/topics/`,
         {
             headers:{
                 "Content-type":"application/json",
                 "Authorization":localStorage.getItem(KEY_TOKEN)
             },
         }
         )
         .then( successHandler )
         .catch( errorHandler )
}

export {
    getTopics
}