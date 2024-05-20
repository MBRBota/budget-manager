import { resourceApi } from '../../utils/axios';
import { APP_CONSTANTS } from '../../utils/constants';
import { retryWithRefresh } from './retryWithRefresh.service';

export const getUserCategories = async (accessToken) => {
  const { data } = await resourceApi.get(APP_CONSTANTS.API_ENDPOINTS.BUDGET_ENDPOINTS.CATEGORY_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  // If request fails, try again after refreshing access token
  // On success, return new access token along with data
  if (!data?.success) return await retryWithRefresh((newToken) => getUserCategories(newToken));

  return data;
};

export const getUserExpenses = async (accessToken) => {
  const { data } = await resourceApi.get(APP_CONSTANTS.API_ENDPOINTS.BUDGET_ENDPOINTS.EXPENSE_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  // If request fails, try again after refreshing access token
  // On success, return new access token along with data
  if (!data?.success) return await retryWithRefresh((newToken) => getUserExpenses(newToken));

  return data;
};

export const getUserResources = async (accessToken) => {
  const categoriesResponse = await getUserCategories(accessToken);
  const expensesResponse = await getUserExpenses(accessToken);

  if (!categoriesResponse?.success || !expensesResponse?.success) return { success: false };

  const unifiedResponse = {
    success: true,
    message: 'User resources retrieved successfully.',
    data: { ...categoriesResponse.data, ...expensesResponse.data },
  };

  return unifiedResponse;
};
