import type { Movie } from './Movie';

/**
 * Pagination information returned as the result of a list query
 */
export interface PaginationInfo {
  /** total number of pages */
  totalPages: number;

  /** total number of items */
  totalItems: number;

  /** current page number */
  page: number;

  /** number of items per page */
  perPage: number;

  /** when paginating forwards, are there more items? */
  hasNextPage: boolean;

  /** when paginating backwards, are there more items? */
  hasPreviousPage: boolean;
}

export interface MoviePagination {
  /** Array of movie objects */
  movies: Movie[];

  /** Information to aid in pagination */
  pageInfo: PaginationInfo;
}
