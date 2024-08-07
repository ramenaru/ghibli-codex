import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGhibliSpecies } from '../../hooks/useSpecies';
import ShimmerSpeciesDetail from '../Shimmer/ShimmerSpeciesDetail';
import { FaArrowLeft } from 'react-icons/fa';
import NotFound from '../NotFound';

interface Species {
  id: string;
  name: string;
  classification: string;
  eye_colors: string;
  hair_colors: string;
  image: string; 
}

const SpeciesDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { species, isLoading, isError } = useGhibliSpecies();
  const specie = species?.find((s: Species) => s.id === id);
  const navigate = useNavigate();

  if (isLoading) return <ShimmerSpeciesDetail />;
  if (isError || !specie) return <NotFound />;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300 mb-6">
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <img src="/assets/images/species.webp" alt={specie.name} className="w-full h-64 object-cover rounded-lg shadow-lg" />
        </div>
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold mb-4 text-blue-500">{specie.name}</h2>
          <p className="text-gray-700 mb-4"><strong>Classification:</strong> {specie.classification}</p>
          <p className="text-gray-700 mb-4"><strong>Eye Colors:</strong> {specie.eye_colors}</p>
          <p className="text-gray-700 mb-4"><strong>Hair Colors:</strong> {specie.hair_colors}</p>
        </div>
      </div>
    </div>
  );
}

export default SpeciesDetail;
