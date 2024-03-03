'use client';

import { useMovie, useMovies } from '@/hooks';
import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function MoviesQueryParamPage() {
  console.log('MoviesQueryParamPage render');
  React.useEffect(() => {
    console.log('MoviesQueryParamPage mounted');
    return () => {
      console.log('MoviesQueryParamPage unmounted');
    };
  }, []);

  const searchParams = useSearchParams();
  const movieId = searchParams.get('id');
  const { movies } = useMovies();
  const { movie } = useMovie(movieId);

  return (
    <div className="flex min-h-0 flex-1 p-4">
      <ul className="pr-10 text-sm flex-none overflow-auto">
        {movies.map((movie: any) => (
          <li key={movie.name}>
            <Link
              className={movie.id === movieId ? 'underline' : ''}
              href={`/movies-query-param?id=${movie.id}`}
            >
              {movie.name}
            </Link>
          </li>
        ))}
      </ul>

      {movieId === null && <div className="px-2">Select a movie</div>}

      {movieId !== null && movie === undefined && <div>Loading...</div>}

      {movieId !== null && movie !== undefined && (
        <div className="px-2">
          <p className="text-xl">{movie.name}</p>
          <p>{movie.year}</p>
          <p>Rating: {movie.rating}</p>
        </div>
      )}
    </div>
  );
}
