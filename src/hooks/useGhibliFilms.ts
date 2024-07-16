import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useGhibliFilms = () => {
  const { data, error } = useSWR('https://ghibliapi.vercel.app/films', fetcher, { revalidateOnFocus: false });

  return {
    films: data,
    isLoading: !error && !data,
    isError: error
  };
};
