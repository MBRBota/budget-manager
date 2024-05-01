import { authApi } from '../utils/axios.js'
import { APP_CONSTANTS } from '../utils/constants'

export const registerUser = async (userCredentials) => {
  return await authApi.post(
    APP_CONSTANTS.API_ENDPOINTS.AUTH_ENDPOINTS.REGISTER_ENDPOINT,
    { user: userCredentials }
  )
}

export const loginUser = async (userCredentials) => {
  return await authApi.post(
    APP_CONSTANTS.API_ENDPOINTS.AUTH_ENDPOINTS.LOGIN_ENDPOINT,
    { user: userCredentials }
  )
}

export const refreshUserToken = async () => {
  return await authApi.get(APP_CONSTANTS.API_ENDPOINTS.AUTH_ENDPOINTS.TOKEN_ENDPOINT)
}