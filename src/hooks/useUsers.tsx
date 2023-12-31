import { useEffect, useState } from "react";
import { Profiles } from "../types";
import { getProfiles } from "../utils/tweet";

const useUsers = (search: string) => {
  const [users, setUsers] = useState<Profiles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(
      async () => {
        setLoading(true);
        try {
          const { data } = await getProfiles(search);
          setUsers(data as Profiles[]);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      },
      search ? 500 : 0,
    );

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return { users, loading };
};

export default useUsers;
