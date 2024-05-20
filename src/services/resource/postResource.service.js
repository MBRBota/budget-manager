import { resourceApi } from '../../utils/axios';
import { APP_CONSTANTS } from '../../utils/constants';
import { retryWithRefresh } from './retryWithRefresh.service';

export const postExpense = async (accessToken, expenseData) => {
  const { data } = await resourceApi.post(
    APP_CONSTANTS.API_ENDPOINTS.BUDGET_ENDPOINTS.EXPENSE_ENDPOINT,
    // expenseSum, expenseDate, categoryId
    { expense: expenseData },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );

  if (!data?.success) return await retryWithRefresh((newToken) => postExpense(newToken, expenseData));

  return data;
};

export const postCategory = async (accessToken, categoryData) => {
  const { data } = await resourceApi.post(
    APP_CONSTANTS.API_ENDPOINTS.BUDGET_ENDPOINTS.CATEGORY_ENDPOINT,
    // categoryName, categoryColor
    { category: categoryData },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );

  if (!data?.success) return await retryWithRefresh((newToken) => postCategory(newToken, categoryData));

  return data;
};
