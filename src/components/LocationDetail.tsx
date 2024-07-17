import React from 'react';
import { useParams } from 'react-router-dom';
import { useGhibliLocations } from '../hooks/useGhibliLocations';
import LoadingBar from './LoadingBar';

const LocationDetail: React.FC = () => {
  const { id } = useParams();
  const { locations, isLoading, isError } = useGhibliLocations();
  const location = locations?.find((l: any) => l.id === id);

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError || !location) return <div>Error loading location details.</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold">{location.name}</h2>
      <p className="text-gray-500">Climate: {location.climate}</p>
      <p className="text-gray-500">Terrain: {location.terrain}</p>
      <p className="text-gray-500">Surface Water: {location.surface_water}</p>
    </div>
  );
}

export default LocationDetail;
