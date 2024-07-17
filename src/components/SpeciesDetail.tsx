import React from 'react';
import { useParams } from 'react-router-dom';
import { useGhibliSpecies } from '../hooks/useGhibliSpecies';
import LoadingBar from './LoadingBar';

const SpeciesDetail: React.FC = () => {
  const { id } = useParams();
  const { species, isLoading, isError } = useGhibliSpecies();
  const specie = species?.find((s: any) => s.id === id);

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError || !specie) return <div>Error loading species details.</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold">{specie.name}</h2>
      <p className="text-gray-500">Classification: {specie.classification}</p>
      <p className="text-gray-500">Eye Colors: {specie.eye_colors}</p>
      <p className="text-gray-500">Hair Colors: {specie.hair_colors}</p>
    </div>
  );
}

export default SpeciesDetail;
