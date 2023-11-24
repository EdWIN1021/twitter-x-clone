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
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { auth } from "../firebase";

// const birthday = new Date(
//   Number(year),
//   monthData.indexOf("January") + 1,
//   Number(day)
// );

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
  //   signOut: () => void;
  //   currentUser: null | undefined;
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
  //   signOut: () => {},
  //   currentUser: null,
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //   const [currentUser, setCurrentUser] = useState<User | null | undefined>(null);
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
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

    return () => observer();
  }, []);

  const signUp = async (cb: () => void) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputFields.email,
        inputFields.password
      );
      if (userCredential?.user) cb();
    } catch (error) {
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

  // const signOut = async () => {};

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
    // signOut,
    // currentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
