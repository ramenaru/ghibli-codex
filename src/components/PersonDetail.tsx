import React from 'react';
import { useParams } from 'react-router-dom';
import { useGhibliPeople } from '../hooks/useGhibliPeople';
import LoadingBar from './LoadingBar';

const PersonDetail: React.FC = () => {
  const { id } = useParams();
  const { people, isLoading, isError } = useGhibliPeople();
  const person = people?.find((p: any) => p.id === id);

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError || !person) return <div>Error loading person details.</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold">{person.name}</h2>
      <p className="text-gray-500">Gender: {person.gender}</p>
      <p className="text-gray-500">Age: {person.age}</p>
      <p className="text-gray-500">Eye Color: {person.eye_color}</p>
      <p className="text-gray-500">Hair Color: {person.hair_color}</p>
    </div>
  );
}

export default PersonDetail;
