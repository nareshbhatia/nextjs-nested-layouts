'use client';

import * as React from 'react';
import { useMovie } from '@/hooks';

export interface MoviePageProps {
  params: { id: string };
}

export default function MoviePage({ params }: MoviePageProps) {
  const { isLoading, isError, error, movie } = useMovie(params.id);

  return movie !== undefined ? (
    <div>
      <p className="text-xl">{movie.name}</p>
      <p>{movie.year}</p>
      <p>Rating: {movie.rating}</p>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
