import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useGhibliFilm = (id: string | undefined) => {
  const { data, error } = useSWR(id ? `https://ghibliapi.vercel.app/films/${id}` : null, fetcher);

  if (data) {
    const filmDetails = {
      ...data,
      people: data.people.map((url: string) => fetch(url).then(res => res.json())),
      locations: data.locations.map((url: string) => fetch(url).then(res => res.json())),
      vehicles: data.vehicles.map((url: string) => fetch(url).then(res => res.json())),
    };
    return {
      film: filmDetails,
      isLoading: !error && !data,
      isError: error
    };
  }

  return {
    film: data,
    isLoading: !error && !data,
    isError: error
  };
};
