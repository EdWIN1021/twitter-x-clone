import {
  ReactNode,
  createContext,
  FC,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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

import { monthData } from "../constants";

import { getUserProfile, initUserProfile } from "../utils/auth";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

interface InputFields {
  email: string;
  name: string;
  year: string;
  day: string;
  month: string;
  password: string;
}

interface AuthContextProps {
  inputFields: InputFields;
  setInputFields: Dispatch<SetStateAction<InputFields>>;
  resetFields: () => void;
  signUp: (cb: () => void) => void;
  signIn: (cb: () => void) => void;
  signInWithGoogle: (cb: () => void) => void;
  signInWithGithub: (cb: () => void) => void;
  signOut: (cb: () => void) => void;
  currentUser: CurrentUser | null;
  setCurrentUser: Dispatch<SetStateAction<CurrentUser | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  inputFields: {
    email: "",
    name: "",
    year: "",
    day: "",
    month: "",
    password: "",
  },
  signUp: () => {},
  setInputFields: () => null,
  resetFields: () => {},
  signIn: () => {},
  signInWithGoogle: () => {},
  signInWithGithub: () => {},
  currentUser: null,
  signOut: () => {},
  setCurrentUser: () => {},
});

export interface CurrentUser extends User {
  name?: string;
  username?: string;
  following?: string[];
}

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [inputFields, setInputFields] = useState({
    email: "",
    name: "",
    year: "",
    day: "",
    month: "",
    password: "",
  });

  const birthday = useMemo(
    () =>
      new Date(
        Number(inputFields.year),
        monthData.indexOf("January") + 1,
        Number(inputFields.day),
      ),
    [inputFields],
  );

  useEffect(() => {
    const observer = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserProfile(user.uid).then((profile) => {
          setCurrentUser(Object.assign(user, profile));
        });

        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => observer();
  }, []);

  const signUp = async (cb: () => void) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        inputFields.email,
        inputFields.password,
      );

      if (user) {
        await initUserProfile(user, birthday);
        await updateProfile(user, {
          displayName: inputFields.name,
        });

        cb();
      }
    } catch (error) {
      console.log(error);
      console.log((error as FirebaseError).message);
    }
  };

  const signIn = async (cb: () => void) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputFields.email,
        inputFields.password,
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

      if (user && profile?.username) {
        cb();
      }

      if (user && !profile?.username) {
        initUserProfile(user, birthday);
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
        initUserProfile(user, birthday);
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

  const resetFields = () => {
    setInputFields({
      email: "",
      name: "",
      year: "",
      day: "",
      month: "",
      password: "",
    });
  };

  const contextValue: AuthContextProps = {
    inputFields,
    setInputFields,
    signUp,
    resetFields,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    signOut,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
