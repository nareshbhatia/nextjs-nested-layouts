import * as React from 'react';
import type { Movie } from '@/models';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

async function fetchMovie(id: String): Promise<Movie | undefined> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const resMovie = await fetch(`${API_URL}/movies/${id}`, {
    // See https://nextjs.org/docs/app/building-your-application/caching#data-cache
    // Don't store the results in Data Cache, always fetch from the data source.
    // In spite of this, you will see that sometimes data is NOT fetched from the data source.
    // That's because the entire page is cached in the client's Router Cache for 30 seconds.
    // See https://nextjs.org/docs/app/building-your-application/caching#router-cache
    // To prevent caching in the Router Cache you must disable it in next.config.js.
    // See https://nextjs.org/docs/app/api-reference/next-config-js/staleTimes
    cache: 'no-store',
  });
  return resMovie.json();
}

export interface MoviePageProps {
  params: { id: string };
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id: movieId } = params;

  const movie = React.use(fetchMovie(movieId));

  if (!movie) {
    return <div>Error: Movie not found</div>;
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
