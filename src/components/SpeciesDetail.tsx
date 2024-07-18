import React from 'react';
import { useParams } from 'react-router-dom';
import { useGhibliSpecies } from '../hooks/useGhibliSpecies';
import LoadingBar from './LoadingBar';

interface Species {
  id: string;
  name: string;
  classification: string;
  eye_colors: string;
  hair_colors: string;
}

const SpeciesDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { species, isLoading, isError } = useGhibliSpecies();
  const specie = species?.find((s: Species) => s.id === id);

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError || !specie) return <div className="text-center text-red-500">Error loading species details.</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">{specie.name}</h2>
      <p className="text-gray-500 mb-2"><strong>Classification:</strong> {specie.classification}</p>
      <p className="text-gray-500 mb-2"><strong>Eye Colors:</strong> {specie.eye_colors}</p>
      <p className="text-gray-500 mb-2"><strong>Hair Colors:</strong> {specie.hair_colors}</p>
    </div>
  );
}

export default SpeciesDetail;
