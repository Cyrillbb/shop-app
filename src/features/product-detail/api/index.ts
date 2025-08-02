import { apiClient } from '@/api';
import type { Product } from '../types';

export const fetchProductDetail = async (productId: number) => {
  const resp = await apiClient.get<Product>(`products/${productId}`);

  return resp.data;
};
