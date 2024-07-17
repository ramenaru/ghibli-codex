import React from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const userContext = useUser();

  if (!userContext || !userContext.user) {
    return <div>Please log in to view your profile.</div>;
  }

  const { user, favorites, removeFavorite } = userContext;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      <p className="text-gray-700 mb-4">Name: {user.displayName}</p>
      <p className="text-gray-700 mb-4">Email: {user.email}</p>
      <h3 className="text-2xl font-bold mb-4">Favorites</h3>
      <ul className="list-disc pl-5">
        {favorites.map((fav: any) => (
          <li key={fav.id}>
            <Link to={`/film/${fav.filmId}`} className="text-primary hover:underline">
              {fav.filmId}
            </Link>
            <button onClick={() => removeFavorite(fav.id)} className="ml-2 text-red-500 hover:underline">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
