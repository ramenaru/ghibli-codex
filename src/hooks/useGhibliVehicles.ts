import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useGhibliVehicles = () => {
  const { data, error } = useSWR('https://ghibliapi.vercel.app/vehicles', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  });

  return {
    vehicles: data,
    isLoading: !error && !data,
    isError: error
  };
};
