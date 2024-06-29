'use client';

import * as React from 'react';
import Link from 'next/link';
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

export default function MoviesQueryParamPage() {
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
    <div className="flex flex-1 min-h-0 p-4">
      <ul className="pr-10 text-sm flex-none overflow-auto">
        {data.movies.map((movie: any) => (
          <li key={movie.name}>
            <Link
              className={movie.id === selectedMovieId ? 'underline' : ''}
              href={`/query-params?id=${movie.id}`}
            >
              {movie.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="px-2">
        {selectedMovieId === null ? (
          'Select a movie'
        ) : (
          <MovieDetail movieId={selectedMovieId} />
        )}
      </div>
    </div>
  );
}
