import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useGhibliSpecies = () => {
  const { data, error } = useSWR('https://ghibliapi.vercel.app/species', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  });

  return {
    species: data,
    isLoading: !error && !data,
    isError: error
  };
};
