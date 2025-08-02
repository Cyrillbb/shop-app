import { apiClient } from '@/api';
import type {
  Category,
  CategoryRequestParams,
  PaginatedCategoriesResponse,
  PaginatedProductsResponse,
  ProductRequestParams,
} from '../types';

export const fetchProducts = async (params: ProductRequestParams) => {
  const resp = await apiClient.get<PaginatedProductsResponse>('products', {
    params,
  });

  return resp.data;
};

export const fetchCategories = async (params?: CategoryRequestParams) => {
  const resp = await apiClient.get<PaginatedCategoriesResponse>('categories', {
    params,
  });

  return resp.data;
};

export const fetchCategory = async (id?: number) => {
  if (!id) return;

  const resp = await apiClient.get<Category>(`categories/${id}`);

  return resp.data;
};
