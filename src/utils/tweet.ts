import { supabase } from "../lib/supabase";

export const getTweet = async (tweetId: string) => {
  const { data } = await supabase
    .from("tweets")
    .select(
      `
          id,
          content,
          type,
          created_at,
          image_url,
          profiles(id, full_name, avatar_url, username)
        `,
    )
    .eq("id", tweetId)
    .single();

  return data;
};

export const createTweet = async (
  user_id: string,
  content: string,
  type: string,
  tweet_id?: string,
  image_url?: string,
) => {
  const response = await supabase
    .from("tweets")
    .insert({ user_id, content, type, tweet_id, image_url })
    .select()
    .single();
  return response;
};

export const uploadTweetImage = async (file: File, tweet_id: string) => {
  const { data: imageData, error } = await supabase.storage
    .from("tweet_images")
    .upload(`${tweet_id}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return { imageData, error };
};

export const getTweets = async () => {
  const { data, error } = await supabase
    .from("tweets")
    .select(
      `
  id,
  content,
  type,
  image_url,
  created_at,
  profiles(id, full_name, avatar_url, username)
`,
    )
    .eq("type", "post")
    .order("created_at", { ascending: false });

  return { data, error };
};

export const getTotalReplies = async (id: string) => {
  const response = await supabase
    .from("tweets")
    .select("*", { count: "exact", head: true })
    .eq("tweet_id", id);
  return response;
};

export const getLikes = async (id: string) => {
  const response = await supabase
    .from("likes")
    .select("id, user_id")
    .eq("tweet_id", id);
  return response;
};

export const createLikes = async (user_id: string, tweet_id: string) => {
  const { data, error } = await supabase
    .from("likes")
    .select()
    .eq("user_id", user_id)
    .eq("tweet_id", tweet_id);

  if (data?.length && !error) {
    await supabase
      .from("likes")
      .delete()
      .match({ id: data[0]?.id });
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
