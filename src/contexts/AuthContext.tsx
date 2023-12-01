import {
  ReactNode,
  createContext,
  FC,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  User,
  signOut as signOutUser,
  updateProfile,
} from "firebase/auth";

import { auth } from "../lib/firebase";

import { FirebaseError } from "firebase/app";

import { getUserProfile, initUserProfile } from "../utils/auth";
import { firebaseErrorHandler } from "../utils/error";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

interface AuthContextProps {
  signUp: (
    email: string,
    password: string,
    birthday: Date,
    name: string,
    cb: () => void,
  ) => void;
  signIn: (email: string, password: string, cb: () => void) => void;
  signInWithGoogle: (cb: () => void) => void;
  signInWithGithub: (cb: () => void) => void;
  signOut: (cb: () => void) => void;
  currentUser: CurrentUser | null;
  setCurrentUser: Dispatch<SetStateAction<CurrentUser | null>>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  signUp: () => {},
  signIn: () => {},
  signInWithGoogle: () => {},
  signInWithGithub: () => {},
  currentUser: null,
  signOut: () => {},
  setCurrentUser: () => {},
  loading: true,
});

export interface CurrentUser extends User {
  name: string;
  username: string;
  following?: string[];
}

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserProfile(user?.uid).then((profile) => {
          setCurrentUser({ ...user, ...profile } as CurrentUser);
          setLoading(false);
        });
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    birthday: Date,
    name: string,
    cb: () => void,
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (user) {
        await initUserProfile(user, birthday, name);
        await updateProfile(user, {
          displayName: name,
        });

        cb();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
        firebaseErrorHandler(error.message);
      }
    }
  };

  const signIn = async (email: string, password: string, cb: () => void) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (userCredential?.user) cb();
    } catch (error) {
      console.log((error as FirebaseError).message);
    }
  };

  const signInWithGoogle = async (cb: () => void) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user as CurrentUser;
      const profile = await getUserProfile(user?.uid);

      console.log(user);
      console.log(profile);

      if (user && profile?.username) {
        cb();
      }

      if (user && !profile?.username) {
        await initUserProfile(user);
        cb();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGithub = async (cb: () => void) => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user as CurrentUser;
      const profile = await getUserProfile(user?.uid);

      if (user && profile?.username) {
        cb();
      }

      if (user && !profile?.username) {
        initUserProfile(user);
        cb();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signOut = async (cb: () => void) => {
    try {
      await signOutUser(auth);
      cb();
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue: AuthContextProps = {
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    signOut,
    currentUser,
    setCurrentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
