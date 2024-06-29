/* Data structures for processing query parameters */

export interface FilterParams {
  certs?: string[];
}

export enum SortParam {
  RANK_ASC = 'RANK_ASC',
}

export interface PageSpec {
  page: number;
  perPage: number;
}

export interface QueryParams {
  filters?: FilterParams;
  sort?: SortParam;
  pageSpec?: PageSpec;
}

export function queryParamsToSearchParams(queryParams: QueryParams) {
  const urlSearchParams = new URLSearchParams();

  // ----- filters.certs -----
  queryParams.filters?.certs?.forEach((cert: string) => {
    urlSearchParams.append('cert', cert);
  });

  // ----- sort -----
  if (queryParams.sort) {
    urlSearchParams.append('sort', queryParams.sort);
  }

  // ----- paginate -----
  if (queryParams.pageSpec) {
    urlSearchParams.append('page', queryParams.pageSpec.page.toString());
    urlSearchParams.append('perPage', queryParams.pageSpec.perPage.toString());
  }

  return urlSearchParams.toString();
}
