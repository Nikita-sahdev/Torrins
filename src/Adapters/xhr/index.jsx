import axios from "axios";
import { config } from "../../Action/config";

function returnAxiosInstance() {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: config.TIMEOUT,
  });
}

export function get(url, headers = {}) {
  const axios = returnAxiosInstance();
  try {
    const responseData = axios.get(url, {
      headers,
    });

    if (headers.hasOwnProperty('Token') || headers.hasOwnProperty('token')) {
      const state = JSON.parse(localStorage.getItem('persist:root'));
      let auth = {}
      if (state?.auth) {
        auth = JSON.parse(state.auth)
      }

      responseData.catch(res => {
        if (res?.response?.status == 401 && auth?.auth) {
          localStorage.clear('persist:root');
          if (window.location?.pathname.includes('/battle-of-bands')|| window.location?.pathname.includes('/giftCards') ||  window.location?.pathname.includes('/blogs')) {
  
          } else {
            window.location.href = '/signin'
          }

        }
      });
    }

    return responseData;
  } catch (error) {
    console.log('error', error);
  }
}

export async function post(url, requestData, headers = {}) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}${url}`, requestData, {
      headers,
    });

    // response.catch(res => {
    //   if(res?.response?.status == 401) {
    //     localStorage.clear('persist:root');
    //     window.location.reload()
    //   }
    // });

    return response;
  } catch (error) {
    return error.response;
  }
}

// for blogs as diff method

var userName = process.env.REACT_APP_BlOGS_USERNAME
var passWord = process.env.REACT_APP_BlOGS_PASSWORD

function authenticateUser(user, password) {
  var token = user + ":" + password;
  // Base64 Encoding -> btoa
  var hash = btoa(token);

  return "Basic " + hash;
}



export function getData(url) {
  const headers = authenticateUser(userName, passWord);
  const axios = returnAxiosInstance();
  try {
    const responseData = axios.get(url, {
      headers: {
        "Authorization": headers,

      },
    },
    );

    return responseData;
  } catch (error) {
    console.log('error', error);
  }
}


export async function postData(url, requestData) {
  const headers = authenticateUser(userName, passWord);
  try {
    const response = await axios.post(url, requestData, {
      headers: {
        "Authorization": headers
      },
      mode: 'no-cors'
    },
    );
    return response;
  } catch (error) {
    console.log(error)
  }

}


export async function postWhatsAppData(url, requestData) {

  try {
    // const headers = {
    //   clientId: process.env.REACT_APP_WHATSAPP_OTPLESS_CLIENT_ID,
    //   clientSecret: process.env.REACT_APP_WHATSAPP_OTPLESS_SECRET_KEY,
    //   'Content-Type': 'application/json'
    // }
    const response = await axios.post(url, requestData, {
    },
    );
    return response;
  } catch (error) {
    console.log(error)
    return error.response
  }

} 
