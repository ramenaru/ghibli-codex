import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGhibliLocations } from '../../hooks/useLocation';
import LoadingBar from '../Loading/LoadingBar';
import { FaArrowLeft } from 'react-icons/fa';

interface Location {
  id: string;
  name: string;
  climate: string;
  terrain: string;
  surface_water: string;
  image: string; 
}

const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { locations, isLoading, isError } = useGhibliLocations();
  const location = locations?.find((l: Location) => l.id === id);
  const navigate = useNavigate();

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError || !location) return <div className="text-center text-red-500">Error loading location details.</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300 mb-6">
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <img src={location.image} alt={location.name} className="w-full h-64 object-cover rounded-lg shadow-lg" />
        </div>
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold mb-4 text-blue-500">{location.name}</h2>
          <p className="text-gray-700 mb-4"><strong>Climate:</strong> {location.climate}</p>
          <p className="text-gray-700 mb-4"><strong>Terrain:</strong> {location.terrain}</p>
          <p className="text-gray-700 mb-4"><strong>Surface Water:</strong> {location.surface_water}</p>
        </div>
      </div>
    </div>
  );
}

export default LocationDetail;
