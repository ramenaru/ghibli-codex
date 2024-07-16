import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useGhibliLocations = () => {
  const { data, error } = useSWR('https://ghibliapi.vercel.app/locations', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  });

  return {
    locations: data,
    isLoading: !error && !data,
    isError: error
  };
};
