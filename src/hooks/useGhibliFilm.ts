import { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export const useGhibliFilm = (id: string | undefined) => {
  const { data, error } = useSWR(id ? `https://ghibliapi.vercel.app/films/${id}` : null, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000, 
  });

  const [filmDetails, setFilmDetails] = useState<any>(null);

  useEffect(() => {
    if (data) {
      const fetchDetails = async () => {
        try {
          const peoplePromises = data.people.map((url: string) => fetcher(url));
          const locationPromises = data.locations.map((url: string) => fetcher(url));
          const vehiclePromises = data.vehicles.map((url: string) => fetcher(url));

          const [people, locations, vehicles] = await Promise.all([
            Promise.all(peoplePromises),
            Promise.all(locationPromises),
            Promise.all(vehiclePromises),
          ]);

          setFilmDetails({ ...data, people, locations, vehicles });
        } catch (error) {
          console.error('Error fetching related data:', error);
        }
      };

      fetchDetails();
    }
  }, [data]);

  return {
    film: filmDetails,
    isLoading: !error && !filmDetails,
    isError: error,
  };
};
