export interface BasePaginatedResponse<T> {
    total: number;
    pageSize: number;
    results: T[];
  }