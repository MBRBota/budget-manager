import { refreshUserToken } from '../auth.service';

export const retryWithRefresh = async (retryCallback) => {
  const refreshResponse = await refreshUserToken();
  if (!refreshResponse?.success) return { success: false };

  // Try previously attempted request again with a fresh access token
  // Include fresh token in requested data object
  const retryResponse = await retryCallback(refreshResponse.data.accessToken);
  retryResponse.data = {
    ...retryResponse.data,
    user: { ...refreshResponse.data },
  };

  return retryResponse;
};
