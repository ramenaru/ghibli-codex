import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where, addDoc, deleteDoc, doc,} from 'firebase/firestore';
import useSWR, { mutate } from 'swr';

interface Favorite {
  id: string;
  filmId: string;
  userId: string;
}

interface UserContextType {
  user: User | null;
  favorites: Favorite[];
  addFavorite: (filmId: string) => Promise<void>;
  removeFavorite: (favId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

const fetchFavorites = async (userId: string) => {
  const q = query(collection(db, 'favorites'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Favorite));
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const { data: favorites } = useSWR(
    user ? `/api/favorites/${user.uid}` : null,
    () => user ? fetchFavorites(user.uid) : []
  );

  const addFavorite = async (filmId: string) => {
    if (user) {
      await addDoc(collection(db, 'favorites'), {
        userId: user.uid,
        filmId,
      });
      mutate(`/api/favorites/${user.uid}`);
    } else {
      console.error('No user authenticated, cannot add favorite');
    }
  };

  const removeFavorite = async (favId: string) => {
    await deleteDoc(doc(db, 'favorites', favId));
    if (user) {
      mutate(`/api/favorites/${user.uid}`);
    }
  };

  return (
    <UserContext.Provider value={{ user, favorites: favorites || [], addFavorite, removeFavorite }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
