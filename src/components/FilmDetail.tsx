import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGhibliFilm } from '../hooks/useGhibliFilm';
import { useGhibliPeople } from '../hooks/useGhibliPeople';
import { useGhibliSpecies } from '../hooks/useGhibliSpecies';
import { useGhibliLocations } from '../hooks/useGhibliLocations';
import { useGhibliVehicles } from '../hooks/useGhibliVehicles';
import LoadingBar from './LoadingBar';

const FilmDetail: React.FC = () => {
  const { id } = useParams();
  const { film, isLoading: isFilmLoading, isError } = useGhibliFilm(id);
  const { people, isLoading: isPeopleLoading } = useGhibliPeople();
  const { species, isLoading: isSpeciesLoading } = useGhibliSpecies();
  const { locations, isLoading: isLocationsLoading } = useGhibliLocations();
  const { vehicles, isLoading: isVehiclesLoading } = useGhibliVehicles();

  const isLoading = isFilmLoading || isPeopleLoading || isSpeciesLoading || isLocationsLoading || isVehiclesLoading;

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError) return <div>Error loading film details.</div>;

  const getRelatedData = (urls: string[], data: any[]) => {
    return urls.map((url) => data.find((item) => item.url === url)).filter((item) => item !== undefined);
  };

  const relatedPeople = getRelatedData(film.people, people);
  const relatedSpecies = getRelatedData(film.species, species);
  const relatedLocations = getRelatedData(film.locations, locations);
  const relatedVehicles = getRelatedData(film.vehicles, vehicles);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <LoadingBar isLoading={false} />
      <img src={film.movie_banner} alt={film.title} className="w-full h-72 object-cover mb-6 rounded-lg" />
      <h2 className="text-3xl font-bold mb-4">{film.title}</h2>
      <p className="text-gray-700 mb-4">{film.description}</p>
      <p className="text-gray-500 mb-2"><strong>Director:</strong> {film.director}</p>
      <p className="text-gray-500 mb-2"><strong>Producer:</strong> {film.producer}</p>
      <p className="text-gray-500 mb-2"><strong>Release Date:</strong> {film.release_date}</p>
      <p className="text-gray-500 mb-6"><strong>Running Time:</strong> {film.running_time} minutes</p>
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Characters</h3>
        <ul className="list-disc pl-5">
          {relatedPeople.map((person: any) => (
            <li key={person.id}>
              <Link to={`/person/${person.id}`} className="text-primary hover:underline">{person.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Species</h3>
        <ul className="list-disc pl-5">
          {relatedSpecies.map((specie: any) => (
            <li key={specie.id}>
              <Link to={`/species/${specie.id}`} className="text-primary hover:underline">{specie.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Locations</h3>
        <ul className="list-disc pl-5">
          {relatedLocations.map((location: any) => (
            <li key={location.id}>
              <Link to={`/location/${location.id}`} className="text-primary hover:underline">{location.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2">Vehicles</h3>
        <ul className="list-disc pl-5">
          {relatedVehicles.map((vehicle: any) => (
            <li key={vehicle.id}>
              <Link to={`/vehicle/${vehicle.id}`} className="text-primary hover:underline">{vehicle.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilmDetail;
