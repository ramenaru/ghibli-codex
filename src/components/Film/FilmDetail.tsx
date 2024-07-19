import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGhibliFilm } from '../../hooks/useFilm';
import { useGhibliPeople } from '../../hooks/useCharacters';
import { useGhibliSpecies } from '../../hooks/useSpecies';
import { useGhibliLocations } from '../../hooks/useLocation';
import { useGhibliVehicles } from '../../hooks/useVehicle';
import { useUser } from '../../context/UserContext';
import ShimmerDetailCard from '../Shimmer/ShimmerDetailCard';

const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { film, isLoading: isFilmLoading, isError: isFilmError } = useGhibliFilm(id);
  const { people, isLoading: isPeopleLoading, isError: isPeopleError } = useGhibliPeople();
  const { species, isLoading: isSpeciesLoading, isError: isSpeciesError } = useGhibliSpecies();
  const { locations, isLoading: isLocationsLoading, isError: isLocationsError } = useGhibliLocations();
  const { vehicles, isLoading: isVehiclesLoading, isError: isVehiclesError } = useGhibliVehicles();
  const userContext = useUser();

  const isLoading = isFilmLoading || isPeopleLoading || isSpeciesLoading || isLocationsLoading || isVehiclesLoading;
  const isError = isFilmError || isPeopleError || isSpeciesError || isLocationsError || isVehiclesError;

  const getRelatedData = (urls: string[], data: any[]) => {
    return urls.map((url) => data.find((item) => item.url === url)).filter((item) => item !== undefined);
  };

  const relatedPeople = film ? getRelatedData(film.people, people) : [];
  const relatedSpecies = film ? getRelatedData(film.species, species) : [];
  const relatedLocations = film ? getRelatedData(film.locations, locations) : [];
  const relatedVehicles = film ? getRelatedData(film.vehicles, vehicles) : [];

  const isFavorite = userContext?.favorites.some(fav => fav.filmId === id);

  if (isLoading) {
    return (
      <div className="p-6">
        <ShimmerDetailCard />
      </div>
    );
  }

  if (isError || !film) {
    return (
      <div className="text-center text-red-500">
        Error loading film details. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img src={film.movie_banner} alt={film.title} className="w-full h-72 object-cover mb-6 rounded-lg" />
      <h2 className="text-3xl font-bold mb-4">{film.title}</h2>
      <p className="text-gray-700 mb-4">{film.description}</p>
      <p className="text-gray-500 mb-2"><strong>Director:</strong> {film.director}</p>
      <p className="text-gray-500 mb-2"><strong>Producer:</strong> {film.producer}</p>
      <p className="text-gray-500 mb-2"><strong>Release Date:</strong> {film.release_date}</p>
      <p className="text-gray-500 mb-6"><strong>Running Time:</strong> {film.running_time} minutes</p>
      {userContext && userContext.user && (
        <button
          onClick={() => isFavorite ? userContext.removeFavorite(userContext.favorites.find(fav => fav.filmId === id)?.id || '') : userContext.addFavorite(id!)}
          className={`p-2 ${isFavorite ? 'bg-red-500' : 'bg-green-500'} text-white rounded mb-4`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      )}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Characters</h3>
        <ul className="list-disc pl-5">
          {relatedPeople.length > 0 ? relatedPeople.map((person: any) => (
            <li key={person.id}>
              <Link to={`/person/${person.id}`} className="text-primary hover:underline">{person.name}</Link>
            </li>
          )) : <li>No characters found.</li>}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Species</h3>
        <ul className="list-disc pl-5">
          {relatedSpecies.length > 0 ? relatedSpecies.map((specie: any) => (
            <li key={specie.id}>
              <Link to={`/species/${specie.id}`} className="text-primary hover:underline">{specie.name}</Link>
            </li>
          )) : <li>No species found.</li>}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Locations</h3>
        <ul className="list-disc pl-5">
          {relatedLocations.length > 0 ? relatedLocations.map((location: any) => (
            <li key={location.id}>
              <Link to={`/location/${location.id}`} className="text-primary hover:underline">{location.name}</Link>
            </li>
          )) : <li>No locations found.</li>}
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2">Vehicles</h3>
        <ul className="list-disc pl-5">
          {relatedVehicles.length > 0 ? relatedVehicles.map((vehicle: any) => (
            <li key={vehicle.id}>
              <Link to={`/vehicle/${vehicle.id}`} className="text-primary hover:underline">{vehicle.name}</Link>
            </li>
          )) : <li>No vehicles found.</li>}
        </ul>
      </div>
    </div>
  );
}

export default FilmDetail;
