import { resourceApi } from "../utils/axios";
import { APP_CONSTANTS } from "../utils/constants";
import { refreshUserToken } from "./auth.service";

export const getUserCategories = async (accessToken) => {
  const { data } = await resourceApi.get(
    APP_CONSTANTS.API_ENDPOINTS.BUDGET_ENDPOINTS.CATEGORY_ENDPOINT,
    { headers: { "Authorization": `Bearer ${accessToken}` }}
  )

  if (!data?.success) {
    const refreshResponse = await refreshUserToken()
    if (!refreshResponse?.success)
      return { success: false }

    const retryResponse = await getUserCategories(refreshResponse.data.accessToken)
    retryResponse.data = { ...retryResponse.data, ...refreshResponse.data }
    return retryResponse
  }

  return data
}

export const getUserExpenses = async (accessToken) => {
  const { data } = await resourceApi.get(
    APP_CONSTANTS.API_ENDPOINTS.BUDGET_ENDPOINTS.EXPENSE_ENDPOINT,
    { headers: { "Authorization": `Bearer ${accessToken}` }}
  )

  if (!data?.success) {
    const refreshResponse = await refreshUserToken()
    if (!refreshResponse?.success)
      return { success: false }

    const retryResponse = await getUserExpenses(refreshResponse.data.accessToken)
    retryResponse.data = { ...retryResponse.data, ...refreshResponse.data }
    return retryResponse
  }

  return data
}

export const getUserResources = async (accessToken) => {
  const categoriesResponse = await getUserCategories(accessToken)
  const expensesResponse = await getUserExpenses(accessToken)

  if (!categoriesResponse?.success || !expensesResponse?.success)
    return { success: false }

  const unifiedResponses = {
    success: true,
    message: "User resources retrieved successfully.",
    data: { ...categoriesResponse.data, ...expensesResponse.data }
  }
  
  return unifiedResponses
}