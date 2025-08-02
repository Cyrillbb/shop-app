export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  offset: number;
  limit: number;
};

export type PaginationRequestParams = { limit?: number; offset?: number };
