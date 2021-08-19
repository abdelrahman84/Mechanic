import { ACCESS_TOKEN, LOGIN_USER } from "../constants";

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