import { authApi } from '../utils/axios.js'
import { APP_CONSTANTS } from '../utils/constants'

export const registerUser = async (userCredentials) => {
  const { data } = await authApi.post(
    APP_CONSTANTS.API_ENDPOINTS.AUTH_ENDPOINTS.REGISTER_ENDPOINT,
    { user: userCredentials }
  )
  return data
}

export const loginUser = async (userCredentials) => {
  const { data } = await authApi.post(
    APP_CONSTANTS.API_ENDPOINTS.AUTH_ENDPOINTS.LOGIN_ENDPOINT,
    { user: userCredentials }
  )
  return data
}

export const refreshUserToken = async () => {
  const { data } = await authApi.get(APP_CONSTANTS.API_ENDPOINTS.AUTH_ENDPOINTS.TOKEN_ENDPOINT)
  return data
}