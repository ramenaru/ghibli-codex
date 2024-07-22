import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGhibliFilm } from '../../hooks/useFilm';
import { useGhibliPeople } from '../../hooks/useCharacters';
import { useGhibliSpecies } from '../../hooks/useSpecies';
import { useGhibliLocations } from '../../hooks/useLocation';
import { useGhibliVehicles } from '../../hooks/useVehicle';
import { useUser } from '../../context/UserContext';
import ShimmerDetailCard from '../Shimmer/ShimmerDetailCard';
import NotFound from '../NotFound';

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
      <NotFound />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={film.movie_banner} alt={film.title} className="w-full h-72 object-cover" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-bold mb-4 text-blue-500">{film.title}</h2>
          <h3 className="text-xl italic mb-4 text-gray-600">{film.original_title} ({film.original_title_romanised})</h3>
          <p className="text-gray-700 mb-6">{film.description}</p>
          <div className="mb-4">
            <p className="text-gray-500"><strong>Director:</strong> {film.director}</p>
            <p className="text-gray-500"><strong>Producer:</strong> {film.producer}</p>
            <p className="text-gray-500"><strong>Release Date:</strong> {film.release_date}</p>
            <p className="text-gray-500"><strong>Running Time:</strong> {film.running_time} minutes</p>
            <p className="text-gray-500"><strong>Rotten Tomatoes Score:</strong> {film.rt_score}</p>
          </div>
          {userContext && userContext.user ? (
            <button
              onClick={() => isFavorite ? userContext.removeFavorite(userContext.favorites.find(fav => fav.filmId === id)?.id || '') : userContext.addFavorite(id!)}
              className={`p-2 ${isFavorite ? 'bg-red-500' : 'bg-green-500'} text-white rounded mb-6 transition-colors duration-300`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          ) : (
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded mb-6">
              <p>
                <Link to="/login" className="text-blue-500 hover:underline">Login</Link> to add this film to your favorites.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-3xl font-bold text-blue-500 mb-4">Related Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-2xl font-semibold mb-2">Characters</h4>
            <div className="flex flex-wrap gap-2">
              {relatedPeople.length > 0 ? relatedPeople.map((person: any) => (
                <Link to={`/person/${person.id}`} key={person.id} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors duration-300">
                  {person.name}
                </Link>
              )) : <span>No characters found.</span>}
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-semibold mb-2">Species</h4>
            <div className="flex flex-wrap gap-2">
              {relatedSpecies.length > 0 ? relatedSpecies.map((specie: any) => (
                <Link to={`/species/${specie.id}`} key={specie.id} className="bg-green-100 text-green-600 px-3 py-1 rounded-full hover:bg-green-200 transition-colors duration-300">
                  {specie.name}
                </Link>
              )) : <span>No species found.</span>}
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-semibold mb-2">Locations</h4>
            <div className="flex flex-wrap gap-2">
              {relatedLocations.length > 0 ? relatedLocations.map((location: any) => (
                <Link to={`/location/${location.id}`} key={location.id} className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full hover:bg-yellow-200 transition-colors duration-300">
                  {location.name}
                </Link>
              )) : <span>No locations found.</span>}
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-semibold mb-2">Vehicles</h4>
            <div className="flex flex-wrap gap-2">
              {relatedVehicles.length > 0 ? relatedVehicles.map((vehicle: any) => (
                <Link to={`/vehicle/${vehicle.id}`} key={vehicle.id} className="bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200 transition-colors duration-300">
                  {vehicle.name}
                </Link>
              )) : <span>No vehicles found.</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmDetail;
