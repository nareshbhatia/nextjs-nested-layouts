'use client';

import * as React from 'react';
import Link from 'next/link';
import { SelectMovieMessage } from '@/components/SelectMovieMessage';
import type { MoviePagination, QueryParams } from '@/models';
import { queryParamsToSearchParams, SortParam } from '@/models';
import { MovieDetail } from './_components';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

async function fetchMovies(queryParams: QueryParams): Promise<MoviePagination> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const searchParamsString = queryParamsToSearchParams(queryParams);
  const resMovies = await fetch(`${API_URL}/movies?${searchParamsString}`);
  return resMovies.json();
}

const baseStyles = 'container relative mx-auto max-w-screen-xl px-8 py-4';

function QueryParamBase() {
  // extract movieId from a query params like '/query-params?id=1234'
  const searchParams = useSearchParams();
  const selectedMovieId = searchParams.get('id');

  const top10QueryParams: QueryParams = {
    sort: SortParam.RANK_ASC,
    pageSpec: {
      page: 1,
      perPage: 10,
    },
  };

  // query for top 10 movies
  const { data, error, isLoading } = useQuery({
    queryKey: ['movies', top10QueryParams],
    queryFn: async () => fetchMovies(top10QueryParams),
  });

  if (isLoading) {
    return <div className={baseStyles}>Loading...</div>;
  }

  if (error || !data) {
    return (
      <div className={baseStyles}>
        Error: {error ? error.message : 'Movies not found'}
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-h-0 py-8">
      <ul className="text-sm flex-none overflow-auto">
        {data.movies.map((movie: any) => (
          <li className="pb-6" key={movie.name}>
            <Link
              className={movie.id === selectedMovieId ? 'underline' : ''}
              href={`/query-params?id=${movie.id}`}
              prefetch={false}
            >
              {movie.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex-1 px-6">
        {selectedMovieId === null ? (
          <SelectMovieMessage />
        ) : (
          <MovieDetail movieId={selectedMovieId} />
        )}
      </div>
    </div>
  );
}

export default function QueryParamPage() {
  // This is to avoid the following error when running `npm run build`:
  // useSearchParams() should be wrapped in a suspense boundary at page "/query-params".
  // Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  return (
    <React.Suspense>
      <QueryParamBase />
    </React.Suspense>
  );
}
