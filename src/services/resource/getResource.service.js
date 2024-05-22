import { resourceApi } from '../../utils/axios';
import { APP_CONSTANTS } from '../../utils/constants';

export const getUserCategories = async (accessToken) => {
  const { data } = await resourceApi.get(APP_CONSTANTS.API_ENDPOINTS.BUDGET_ENDPOINTS.CATEGORY_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};

export const getUserExpenses = async (accessToken) => {
  const { data } = await resourceApi.get(APP_CONSTANTS.API_ENDPOINTS.BUDGET_ENDPOINTS.EXPENSE_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};

export const getUserResources = async (accessToken) => {
  const categoriesResponse = await getUserCategories(accessToken);
  const expensesResponse = await getUserExpenses(accessToken);

  const unifiedResponse = {
    success: true,
    message: 'User resources retrieved successfully.',
    data: { ...categoriesResponse.data, ...expensesResponse.data },
  };

  return unifiedResponse;
};
