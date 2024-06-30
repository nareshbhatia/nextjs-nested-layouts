import * as React from 'react';
import type { Movie } from '@/models';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

async function fetchMovie(id: String): Promise<Movie> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const resMovie = await fetch(`${API_URL}/movies/${id}`);
  return resMovie.json();
}

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
    return <div>Loading...</div>;
  }

  if (error || !movie) {
    return <div>Error: {error ? error.message : 'Movie not found'}</div>;
  }

  const { name, releaseYear, ratingsSummary } = movie;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{releaseYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Rating: {ratingsSummary.aggregateRating}</p>
      </CardContent>
    </Card>
  );
}
