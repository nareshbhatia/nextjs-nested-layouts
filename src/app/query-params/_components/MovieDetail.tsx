import * as React from 'react';
import type { Movie } from '@/models';
import { useQuery } from '@tanstack/react-query';

async function fetchMovie(id: String): Promise<Movie> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const resMovie = await fetch(`${API_URL}/movies/${id}`);
  return resMovie.json();
}

const baseStyles = 'px-8 py-4';

interface MovieDetailProps {
  movieId: string;
}

export function MovieDetail({ movieId }: MovieDetailProps) {
  const {
    data: movie,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: async () => fetchMovie(movieId),
  });

  if (isLoading) {
    return <div className={baseStyles}>Loading...</div>;
  }

  if (error || !movie) {
    return (
      <div className={baseStyles}>
        Error: {error ? error.message : 'Movie not found'}
      </div>
    );
  }

  const { name, releaseYear, ratingsSummary } = movie;

  return (
    <div className={baseStyles}>
      <p className="text-xl">{name}</p>
      <p>{releaseYear}</p>
      <p>Rating: {ratingsSummary.aggregateRating}</p>
    </div>
  );
}
