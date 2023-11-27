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
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  User,
  signOut as signOutUser,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { db } from "../lib/firebase";

import { FirebaseError } from "firebase/app";

import { auth } from "../lib/firebase";

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
  currentUser: User | null;
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
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [inputFields, setInputFields] = useState({
    email: "",
    name: "",
    year: "",
    day: "",
    month: "",
    password: "",
  });

  useEffect(() => {
    const observer = onAuthStateChanged(auth, (user) => {
      if (user) {
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
        inputFields.password
      );

      if (user) {
        await setDoc(doc(db, "users", user?.uid), {
          username: "",
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
        inputFields.password
      );
      if (userCredential?.user) cb();
    } catch (error) {
      console.log((error as FirebaseError).message);
    }
  };

  const signInWithGoogle = async (cb: () => void) => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (user) {
      await setDoc(doc(db, "users", user?.uid), {
        username: "",
      });
      cb();
    }
  };

  const signInWithGithub = async (cb: () => void) => {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;

    if (user) {
      await setDoc(doc(db, "users", user?.uid), {
        username: "",
      });
      cb();
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
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// const birthday = new Date(
//   Number(year),
//   monthData.indexOf("January") + 1,
//   Number(day)
// );
