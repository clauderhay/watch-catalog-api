export class PaginatedResult<T> {
  items: T[];

  total: number;

  page: number;

  perPage: number;
}
