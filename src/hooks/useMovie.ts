import * as React from 'react';
import { Movie } from '@/models';

export function useMovie(movieId: string | null) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const failMessage = 'Failed to get movie';

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState<Error>();
  const [movie, setMovie] = React.useState<Movie | undefined>();

  React.useEffect(() => {
    const fetchMovie = async () => {
      if (movieId === null) {
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}/top-10-movies/${movieId}`);

        if (!response.ok) {
          setIsError(true);
          setError(new Error(`${failMessage} (${response.status})`));
          setIsLoading(false);
          return;
        }

        const movie: Movie = await response.json();
        setMovie(movie);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setError(error instanceof Error ? error : new Error(failMessage));
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [apiUrl, movieId]);
  return { isLoading, isError, error, movie };
}
