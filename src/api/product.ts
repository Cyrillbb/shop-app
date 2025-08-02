import type { PaginatedProductsResponse, ProductRequestParams } from '@/types';
import { apiClient } from './client';

export const fetchProducts = async (params: ProductRequestParams) => {
  const resp = await apiClient.get<PaginatedProductsResponse>('products', {
    params,
  });

  return resp.data;
};
