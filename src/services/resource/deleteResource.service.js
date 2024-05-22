import { resourceApi } from '../../utils/axios';
import { APP_CONSTANTS } from '../../utils/constants';

export const deleteCategory = async (accessToken, categoryId) => {
  const { data } = await resourceApi.delete(APP_CONSTANTS.API_ENDPOINTS.BUDGET_ENDPOINTS.CATEGORY_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
    data: { category: categoryId },
  });

  return data;
};
