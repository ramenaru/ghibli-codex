import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGhibliVehicles } from '../../hooks/useVehicle';
import LoadingBar from '../Loading/LoadingBar';
import { FaArrowLeft } from 'react-icons/fa';
import NotFound from '../NotFound';

interface Vehicle {
  id: string;
  name: string;
  description: string;
  vehicle_class: string;
  length: string;
  pilot: string;
  image: string;
}

const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { vehicles, isLoading, isError } = useGhibliVehicles();
  const vehicle = vehicles?.find((v: Vehicle) => v.id === id);
  const navigate = useNavigate();

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError || !vehicle) return <NotFound />;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300 mb-6">
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <img src={vehicle.image} alt={vehicle.name} className="w-full h-64 object-cover rounded-lg shadow-lg" />
        </div>
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold mb-4 text-blue-500">{vehicle.name}</h2>
          <p className="text-gray-700 mb-4">{vehicle.description}</p>
          <p className="text-gray-500 mb-2"><strong>Vehicle Class:</strong> {vehicle.vehicle_class}</p>
          <p className="text-gray-500 mb-4"><strong>Length:</strong> {vehicle.length}</p>
          {vehicle.pilot && (
            <div className="mt-4">
              <h3 className="text-xl font-bold">Pilot</h3>
              <Link to={`/person/${vehicle.pilot}`} className="text-blue-500 hover:underline">View Pilot</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleDetail;
