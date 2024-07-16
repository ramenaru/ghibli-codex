import React from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useGhibliFilm = (id: string | undefined) => {
  const { data, error } = useSWR(id ? `https://ghibliapi.vercel.app/films/${id}` : null, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000, 
  });

  const [filmDetails, setFilmDetails] = React.useState<any>(null);

  React.useEffect(() => {
    if (data) {
      const fetchDetails = async () => {
        const peoplePromises = data.people.map((url: string) => fetch(url).then(res => res.json()));
        const locationPromises = data.locations.map((url: string) => fetch(url).then(res => res.json()));
        const vehiclePromises = data.vehicles.map((url: string) => fetch(url).then(res => res.json()));

        const people = await Promise.all(peoplePromises);
        const locations = await Promise.all(locationPromises);
        const vehicles = await Promise.all(vehiclePromises);

        setFilmDetails({ ...data, people, locations, vehicles });
      };

      fetchDetails();
    }
  }, [data]);

  return {
    film: filmDetails,
    isLoading: !error && !filmDetails,
    isError: error
  };
};
