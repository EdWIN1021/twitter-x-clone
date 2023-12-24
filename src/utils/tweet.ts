import { supabase } from "../lib/supabase";

export const createTweet = async (
  user_id: string,
  content: string,
  type: string,
  tweet_id?: string,
) => {
  const response = await supabase
    .from("tweets")
    .insert({ user_id, content, type, tweet_id });
  return response;
};

export const getTotalReplies = async (id: string) => {
  const response = await supabase
    .from("tweets")
    .select("*", { count: "exact", head: true })
    .eq("tweet_id", id);
  return response;
};

export const getTotalLikes = async (id: string) => {
  const response = await supabase
    .from("likes")
    .select("id, user_id")
    .eq("tweet_id", id);
  return response;
};

export const updateLikes = async (likes: string[], id: string) => {
  await supabase.from("tweets").update({ likes }).eq("id", id);
};

export const createLikes = async (user_id: string, tweet_id: string) => {
  const { data, error } = await supabase
    .from("likes")
    .select()
    .eq("user_id", user_id)
    .eq("tweet_id", tweet_id)
    .single();

  if (data && !error) {
    await supabase
      .from("likes")
      .delete()
      .match({ id: data?.id });
  } else {
    await supabase.from("likes").insert({ user_id, tweet_id });
  }
};

export const getReplies = async (id: string) => {
  const response = await supabase
    .from("tweets")
    .select(
      `
    id,
    content,
    created_at,
    type,
    profiles(id, full_name, avatar_url, username)
  `,
    )
    .eq("tweet_id", id);
  return response;
};
