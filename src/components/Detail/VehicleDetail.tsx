import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGhibliVehicles } from '../../hooks/useVehicle';
import LoadingBar from '../Loading/LoadingBar';

interface Vehicle {
  id: string;
  name: string;
  description: string;
  vehicle_class: string;
  length: string;
  pilot: string;
}

const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { vehicles, isLoading, isError } = useGhibliVehicles();
  const vehicle = vehicles?.find((v: Vehicle) => v.id === id);

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError || !vehicle) return <div className="text-center text-red-500">Error loading vehicle details.</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">{vehicle.name}</h2>
      <p className="text-gray-700 mb-2">{vehicle.description}</p>
      <p className="text-gray-500 mb-2"><strong>Vehicle Class:</strong> {vehicle.vehicle_class}</p>
      <p className="text-gray-500 mb-4"><strong>Length:</strong> {vehicle.length}</p>
      {vehicle.pilot && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Pilot</h3>
          <Link to={`/person/${vehicle.pilot}`} className="text-blue-500 hover:underline">View Pilot</Link>
        </div>
      )}
    </div>
  );
}

export default VehicleDetail;
