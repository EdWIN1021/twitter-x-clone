import { Dispatch, SetStateAction } from "react";

export interface Tweet {
  content: string;
  displayName: string;
  photoURL: string;
  postImageUrl: string;
  timestamp: Date;
  userId: string;
  username: string;
}

export interface InputFields {
  email: string;
  name: string;
  year: string;
  day: string;
  month: string;
  password: string;
}

export interface SignUpProps {
  inputFields: InputFields;
  setInputFields: Dispatch<SetStateAction<InputFields>>;
}
