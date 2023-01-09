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
  apiKey: 'AIzaSyBnKqe7oL2lP3Jv0dNxYMhv7gJq27GVQec',
  authDomain: 'my-shop-4b2fe.firebaseapp.com',
  projectId: 'my-shop-4b2fe',
  storageBucket: 'my-shop-4b2fe.appspot.com',
  messagingSenderId: '482888109050',
  appId: '1:482888109050:web:8311f62192600a64a5f243',
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
