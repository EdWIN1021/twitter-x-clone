import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export interface CurrentUser extends User {
  name: string;
  username: string;
  following?: string[];
  userId: string;
}

export interface Tweet {
  id: string;
  content: string;
  image_url?: string;
  user_id?: string;
  likes?: string[];
  replies?: string[];
  profiles: Profiles;
}

export interface Profiles {
  avatar_url?: string;
  full_name?: string;
  id?: string;
  username?: string;
}

export interface SignUpInputFields {
  email: string;
  name: string;
  year: string;
  day: string;
  month: string;
  password: string;
}

export interface SignInInputFields {
  email: string;
  password: string;
}

export interface SignUpProps {
  inputFields: SignUpInputFields;
  setInputFields: Dispatch<SetStateAction<SignUpInputFields>>;
}

export interface SignInProps {
  inputFields: SignInInputFields;
  setInputFields: Dispatch<SetStateAction<SignInInputFields>>;
}

export enum AuthErrorMessage {
  EMAIL_ALREADY_IN_USE = "auth/email-already-in-use",
}
