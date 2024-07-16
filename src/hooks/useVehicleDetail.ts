import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useVehicleDetail = (id: string | undefined) => {
  const { data, error } = useSWR(id ? `https://ghibliapi.vercel.app/vehicles/${id}` : null, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  });

  return {
    vehicle: data,
    isLoading: !error && !data,
    isError: error
  };
};
