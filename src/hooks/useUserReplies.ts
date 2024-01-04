import { useContext, useEffect, useState } from "react";
import { Reply } from "../types";
import { AuthContext } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

const useUserReplies = () => {
  const [userReplies, setUserReplies] = useState<Reply[]>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const { data, error } = await supabase
          .from("tweets")
          .select(
            `    
            id,
            content,
            created_at,
            tweet_id,
            type,
            profiles(id, full_name, avatar_url, username)`,
          )
          .eq("type", "reply")
          .eq("user_id", currentUser?.id);
        if (data && !error) {
          setUserReplies(data as Reply[]);
        }
      }
    })();
  }, [currentUser]);

  return { userReplies };
};

export default useUserReplies;
