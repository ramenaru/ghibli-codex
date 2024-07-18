import React from 'react';
import { useParams } from 'react-router-dom';
import { useGhibliPeople } from '../hooks/useGhibliPeople';
import LoadingBar from './LoadingBar';

interface Person {
  id: string;
  name: string;
  gender: string;
  age: string;
  eye_color: string;
  hair_color: string;
}

const PersonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { people, isLoading, isError } = useGhibliPeople();
  const person = people?.find((p: Person) => p.id === id);

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError || !person) return <div className="text-center text-red-500">Error loading person details.</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">{person.name}</h2>
      <p className="text-gray-500 mb-2"><strong>Gender:</strong> {person.gender}</p>
      <p className="text-gray-500 mb-2"><strong>Age:</strong> {person.age}</p>
      <p className="text-gray-500 mb-2"><strong>Eye Color:</strong> {person.eye_color}</p>
      <p className="text-gray-500 mb-2"><strong>Hair Color:</strong> {person.hair_color}</p>
    </div>
  );
}

export default PersonDetail;
