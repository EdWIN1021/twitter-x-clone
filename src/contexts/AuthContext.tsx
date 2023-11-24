import { ReactNode, createContext, FC, useEffect } from "react";

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth();

// interface CustomError extends Error {
//   message: string;
// }

interface AuthContextProps {
  signUp: (email: string, name: string, birthday: Date) => void;
  //   signIn: (email: string, password: string) => void;
  //   signOut: () => void;
  //   currentUser: null | undefined;
}

export const AuthContext = createContext<AuthContextProps>({
  signUp: () => {},
  //   signIn: () => {},
  //   signOut: () => {},
  //   currentUser: null,
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //   const [currentUser, setCurrentUser] = useState<User | null | undefined>(null);

  useEffect(() => {}, []);

  const signUp = async (email: string, name: string, birthday: Date) => {
    console.log(email, name, birthday);
  };

  //   const signIn = async (email: string, password: string) => {};

  //   const signOut = async () => {};

  const contextValue: AuthContextProps = {
    signUp,
    // signIn,
    // signOut,
    // currentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
