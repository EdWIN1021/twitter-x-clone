import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export interface CurrentUser extends User {
  name: string;
  username: string;
  following?: string[];
  userId: string;
}

export interface Tweet {
  tweetId: string;
  content: string;
  displayName: string;
  photoURL: string;
  postImageUrl: string;
  timestamp: Timestamp;
  userId: string;
  username: string;
  likes: string[];
  replies: string[];
}
export interface Timestamp extends Date {
  toDate: () => Date;
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
