import useSWR from 'swr';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export const useGhibliLocations = () => {
  const { data, error } = useSWR('https://ghibliapi.vercel.app/locations', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  });

  return {
    locations: data,
    isLoading: !error && !data,
    isError: !!error,
  };
};
