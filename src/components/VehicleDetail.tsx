import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVehicleDetail } from '../hooks/useVehicleDetail';
import LoadingBar from './LoadingBar';

const VehicleDetail: React.FC = () => {
  const { id } = useParams();
  const { vehicle, isLoading, isError } = useVehicleDetail(id);

  if (isLoading) return <LoadingBar />;
  if (isError || !vehicle) return <div>Error loading vehicle details.</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold">{vehicle.name}</h2>
      <p className="text-gray-700">{vehicle.description}</p>
      <p className="text-gray-500">Vehicle Class: {vehicle.vehicle_class}</p>
      <p className="text-gray-500">Length: {vehicle.length}</p>
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
