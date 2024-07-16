import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useGhibliPeople = () => {
  const { data, error } = useSWR('https://ghibliapi.vercel.app/people', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  });

  return {
    people: data,
    isLoading: !error && !data,
    isError: error
  };
};
