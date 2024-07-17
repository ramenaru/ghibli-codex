import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where, addDoc, deleteDoc, doc, DocumentData, DocumentReference } from 'firebase/firestore';

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

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const q = query(collection(db, 'favorites'), where('userId', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);
          const favs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Favorite));
          setFavorites(favs);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      } else {
        setUser(null);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addFavorite = async (filmId: string) => {
    if (user) {
      try {
        const newFav: DocumentReference<DocumentData> = await addDoc(collection(db, 'favorites'), {
          userId: user.uid,
          filmId,
        });
        setFavorites([...favorites, { id: newFav.id, filmId, userId: user.uid }]);
      } catch (error) {
        console.error('Error adding favorite:', error);
      }
    } else {
      console.error('No user authenticated, cannot add favorite');
    }
  };

  const removeFavorite = async (favId: string) => {
    try {
      await deleteDoc(doc(db, 'favorites', favId));
      setFavorites(favorites.filter(fav => fav.id !== favId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, favorites, addFavorite, removeFavorite }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
