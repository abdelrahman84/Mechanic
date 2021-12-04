import { ACCESS_TOKEN, LOGIN_USER, UPDATE_USER_NAME } from "../constants";

export function loginUser(user) {
  return {
      type: LOGIN_USER,
      payload: user
  }
}

export function accessToken(token) {
  return {
    type: ACCESS_TOKEN,
    payload: token
  }
}  

export function updateUserName(user) {
  return {
    type: UPDATE_USER_NAME,
    payload: user,
  }
}