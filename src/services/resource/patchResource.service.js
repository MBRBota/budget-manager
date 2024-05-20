import { resourceApi } from '../../utils/axios';
import { APP_CONSTANTS } from '../../utils/constants';
import { retryWithRefresh } from './retryWithRefresh.service';

export const patchCategory = async (accessToken, categoryData) => {
  const { data } = await resourceApi.patch(
    APP_CONSTANTS.API_ENDPOINTS.BUDGET_ENDPOINTS.CATEGORY_ENDPOINT,
    // categoryName, categoryColor
    { category: categoryData },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );

  if (!data?.success) return await retryWithRefresh((newToken) => patchCategory(newToken, categoryData));

  return data;
};
