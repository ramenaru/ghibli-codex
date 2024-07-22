import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGhibliPeople } from '../../hooks/useCharacters';
import LoadingBar from '../Loading/LoadingBar';
import { FaArrowLeft } from 'react-icons/fa';
import NotFound from '../NotFound';

interface Person {
  id: string;
  name: string;
  gender: string;
  age: string;
  eye_color: string;
  hair_color: string;
  image: string; 
}

const PersonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { people, isLoading, isError } = useGhibliPeople();
  const person = people?.find((p: Person) => p.id === id);
  const navigate = useNavigate();

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError || !person) return <NotFound />;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300 mb-6">
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <img src={person.image} alt={person.name} className="w-full h-64 object-cover rounded-lg shadow-lg" />
        </div>
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold mb-4 text-blue-500">{person.name}</h2>
          <p className="text-gray-700 mb-4"><strong>Gender:</strong> {person.gender}</p>
          <p className="text-gray-700 mb-4"><strong>Age:</strong> {person.age}</p>
          <p className="text-gray-700 mb-4"><strong>Eye Color:</strong> {person.eye_color}</p>
          <p className="text-gray-700 mb-4"><strong>Hair Color:</strong> {person.hair_color}</p>
        </div>
      </div>
    </div>
  );
}

export default PersonDetail;
