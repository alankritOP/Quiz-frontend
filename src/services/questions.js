import axios from 'axios';

import { successHandler, errorHandler } from './helper'

const KEY_TOKEN = "token";

const fetchQuizById = ( id ) =>{
    return axios.get( `http://localhost:3000/questions/${id}`,
    {
        headers:{
            'Content-type':'application/json',
            'Authorization':localStorage.getItem( KEY_TOKEN )
        },
    })
    .then( successHandler )
    .catch( errorHandler )
}

const showScore = ( answers,questions ) => {
    return axios.post(`http://localhost:3000/questions/marks`,{answers,questions},
    {
    headers:{
       'Content-type':"application/json",
       'Authorization':localStorage.getItem( KEY_TOKEN )
    }}
    )
    .then( successHandler )
    .catch( errorHandler )
}

export {
    fetchQuizById,
    showScore
}
