import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { Tweet } from "../types";

export const getTweet = async (tweetId: string) => {
  const { data } = (await supabase
    .from("tweets")
    .select(
      `
      id,
      content,
      type,
      created_at,
      image_url,
      tweet_id,
      profiles(id, full_name, avatar_url, username)
      `,
    )
    .eq("id", tweetId)
    .single()) as PostgrestSingleResponse<Tweet>;

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

export const followUser = async (user_id: string, follower_user_id: string) => {
  const response = await supabase.from("follows").insert({
    user_id,
    follower_user_id,
  });

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
  const { data, error } = (await supabase
    .from("tweets")
    .select(
      `
      id,
      content,
      type,
      image_url,
      created_at,
      tweet_id,
      profiles(id, full_name, avatar_url, username)
    `,
    )
    .neq("type", "reply")
    .order("created_at", {
      ascending: false,
    })) as PostgrestSingleResponse<Tweet[]>;

  return { data, error };
};

export const getUserTweets = async (user_id: string) => {
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
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  return { data, error };
};

export const getTotalReplies = async (id: string) => {
  const response = await supabase
    .from("tweets")
    .select("*", { count: "exact", head: true })
    .eq("tweet_id", id)
    .eq("type", "reply");
  return response;
};

export const getTotalQuotes = async (id: string) => {
  const response = await supabase
    .from("tweets")
    .select("*", { count: "exact", head: true })
    .eq("tweet_id", id)
    .eq("type", "quote");
  return response;
};

export const getTotalFollowings = async (user_id: string) => {
  const response = await supabase
    .from("followers")
    .select("*", { count: "exact", head: true })
    .eq("follower_user_id", user_id);

  return response;
};

export const getTotalFollowers = async (user_id: string) => {
  const response = await supabase
    .from("followers")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user_id);

  return response;
};

export const getLikes = async (id: string) => {
  const response = await supabase
    .from("likes")
    .select("id, user_id, tweet_id")
    .eq("tweet_id", id);
  return response;
};

export const getLikedTweets = async (user_id: string) => {
  const response = await supabase
    .from("likes")
    .select(
      `
      id,
      tweets(
        id, created_at, image_url, content, type,
        profiles(id, full_name, avatar_url, username)
      )
      `,
    )
    .eq("user_id", user_id);
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

export const getProfiles = async (search: string, follower_user_id: string) => {
  let response;
  if (search) {
    response = await supabase
      .from("profiles")
      .select()
      .textSearch("full_name", search, {
        config: "english",
      });
  } else {
    const temp: string[] = [follower_user_id];
    const { data } = await supabase
      .from("followers")
      .select(
        `
        user_id
        `,
      )
      .eq("follower_user_id", follower_user_id);
    data?.forEach((item) => temp.push(item.user_id));
    response = await supabase
      .from("profiles")
      .select()
      .not("id", "in", `(${temp.join(",")})`);
  }

  return response;
};
