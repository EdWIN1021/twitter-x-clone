import { useContext, useEffect, useState } from "react";
import { Profiles } from "../types";
import { getProfiles } from "../utils/tweet";
import { AuthContext } from "../contexts/AuthContext";

const useUsers = (search: string) => {
  const [users, setUsers] = useState<Profiles[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(
      async () => {
        if (currentUser) {
          setLoading(true);
          try {
            const { data } = await getProfiles(search, currentUser.id);
            setUsers(data as Profiles[]);
          } catch (err) {
            console.log(err);
          } finally {
            setLoading(false);
          }
        }
      },
      search ? 500 : 0,
    );

    return () => {
      clearTimeout(timer);
    };
  }, [search, currentUser]);

  return { users, loading };
};

export default useUsers;
