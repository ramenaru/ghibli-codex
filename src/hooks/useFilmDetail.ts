import { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export const useGhibliFilmDetail = (id: string | undefined) => {
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
          const speciesPromises = data.species.map((url: string) => fetcher(url));

          const [people, species] = await Promise.all([
            Promise.all(peoplePromises),
            Promise.all(speciesPromises),
          ]);

          setFilmDetails({ ...data, people, species});
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
