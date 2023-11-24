import {
  ReactNode,
  createContext,
  FC,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// const auth = getAuth();

// interface CustomError extends Error {
//   message: string;
// }

interface SignUpFields {
  email: string;
  name: string;
  year: string;
  day: string;
  month: string;
  password: string;
}

interface AuthContextProps {
  signUpFields: SignUpFields;
  signUp: (email: string, name: string, birthday: Date) => void;
  setSignUpFields: Dispatch<SetStateAction<SignUpFields>>;
  resetFields: () => void;
  //   signIn: (email: string, password: string) => void;
  //   signOut: () => void;
  //   currentUser: null | undefined;
}

export const AuthContext = createContext<AuthContextProps>({
  signUpFields: {
    email: "",
    name: "",
    year: "",
    day: "",
    month: "",
    password: "",
  },
  signUp: () => {},
  setSignUpFields: () => null,
  resetFields: () => {},
  //   signIn: () => {},
  //   signOut: () => {},
  //   currentUser: null,
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //   const [currentUser, setCurrentUser] = useState<User | null | undefined>(null);
  const [signUpFields, setSignUpFields] = useState({
    email: "",
    name: "",
    year: "",
    day: "",
    month: "",
    password: "",
  });

  useEffect(() => {}, []);

  const signUp = async (email: string, name: string, birthday: Date) => {
    console.log(email, name, birthday);
  };

  //   const signIn = async (email: string, password: string) => {};
  //   const signOut = async () => {};

  const resetFields = () => {
    setSignUpFields({
      email: "",
      name: "",
      year: "",
      day: "",
      month: "",
      password: "",
    });
  };

  const contextValue: AuthContextProps = {
    signUpFields,
    setSignUpFields,
    signUp,
    resetFields,

    // signIn,
    // signOut,
    // currentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
