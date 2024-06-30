'use client';

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
  // This client-side query does NOT require `cache: 'no-store'` to disable the server Data Cache.
  // Also it does NOT require to disable the client-side Router Cache because that cache is only for Server Components.
  const resMovie = await fetch(`${API_URL}/movies/${id}`);
  return resMovie.json();
}

export interface MoviePageProps {
  params: { id: string };
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id: movieId } = params;

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
