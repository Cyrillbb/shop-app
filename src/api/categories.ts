import type { PaginatedCategoriesResponse } from '@/types';
import { apiClient } from './client';

export const fetchCategories = async () => {
  const resp = await apiClient.get<PaginatedCategoriesResponse>('categories');

  return resp.data;
};
