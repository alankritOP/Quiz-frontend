import axios from 'axios';

import { successHandler, errorHandler } from './helper';

const KEY_TOKEN = "token";
const KEY_EMAIL = "email";

const login = (credentails) =>{
    return axios 
                .post( `http://localhost:3000/auth/login`, credentails, 
                {
                    headers:{
                        "Content-type": "application/json",
                    }
                })
                .then(successHandler)
                .catch(errorHandler)
}

const register = ( credentials ) =>{
    return axios.post(
        `http://localhost:3000/auth/register`, credentials, 
        {
            headers:{
                "Content-type": "application/json",
            }
        }
    )
    .then( successHandler )
    .then((data) => {
      const { authToken, email } = data;

      localStorage.setItem( KEY_TOKEN, authToken );
      localStorage.setItem( KEY_EMAIL, JSON.stringify(email) );

      return email;
    })
    .catch( errorHandler );
}

const isAuthenticated = () => {
    return !!localStorage.getItem( KEY_TOKEN );
  };
  
  const getEmail = () => {
    return JSON.parse(localStorage.getItem( KEY_EMAIL ));
  };
  
  const getToken = () => {
    return localStorage.getItem( KEY_TOKEN );
  };

export {
    login,
    register,
    isAuthenticated,
    getEmail,
    getToken,
}