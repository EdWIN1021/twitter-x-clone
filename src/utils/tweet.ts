import { supabase } from "../lib/supabase";

export const createTweet = async (user_id: string, content: string) => {
  const response = await supabase.from("tweets").insert({ user_id, content });
  return response;
};
