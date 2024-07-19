import React from 'react';
import { useParams } from 'react-router-dom';
import { useGhibliLocations } from '../../hooks/useLocation';
import LoadingBar from '../Loading/LoadingBar';

interface Location {
  id: string;
  name: string;
  climate: string;
  terrain: string;
  surface_water: string;
}

const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { locations, isLoading, isError } = useGhibliLocations();
  const location = locations?.find((l: Location) => l.id === id);

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError || !location) return <div className="text-center text-red-500">Error loading location details.</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">{location.name}</h2>
      <p className="text-gray-500 mb-2"><strong>Climate:</strong> {location.climate}</p>
      <p className="text-gray-500 mb-2"><strong>Terrain:</strong> {location.terrain}</p>
      <p className="text-gray-500 mb-2"><strong>Surface Water:</strong> {location.surface_water}</p>
    </div>
  );
}

export default LocationDetail;
