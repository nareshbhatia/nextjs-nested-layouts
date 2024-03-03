'use client';

import { useMovies } from '@/hooks';
import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Loading } from '@/components/Loading';

interface LayoutProps {
  children: React.ReactNode;
}

export default function MoviesClientComponentsLayout({
  children,
}: LayoutProps) {
  const { isLoading, isError, error, movies } = useMovies();

  // extract movieId from a pathname like '/movies-client-components/[id]'
  const { id: selectedMovieId } = useParams<{ id: string }>();

  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center w-80">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 justify-center items-center w-80">
        {error?.message}
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-h-0 p-4">
      <ul className="pr-10 text-sm flex-none overflow-auto">
        {movies.map((movie: any) => (
          <li key={movie.name}>
            <Link
              className={movie.id === selectedMovieId ? 'underline' : ''}
              href={`/movies-client-components/${movie.id}`}
            >
              {movie.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="px-2">{children}</div>
    </div>
  );
}
