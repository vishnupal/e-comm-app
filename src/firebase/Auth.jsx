import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const AuthContext = createContext(null);

const firebaseConfig = {
 // firebaseconfig
};

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState();

  const signUp = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      updateProfile(user, { displayName });
      setUser(user);
      return user;
    });

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setUser(user);
      return user;
    });
  const signOutUser = () => signOut(auth).then(() => setUser(null));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => unsubscribe();
  });

  return {
    signUp,
    signIn,
    signOut: signOutUser,
    user,
  };
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default AuthProvider;
