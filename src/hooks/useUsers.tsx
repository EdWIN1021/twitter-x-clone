import { useEffect, useState } from "react";
import { Profiles } from "../types";
import { supabase } from "../lib/supabase";

const useUsers = () => {
  const [users, setUsers] = useState<Profiles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.from("profiles").select();
        setUsers(data as Profiles[]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();

    return () => {
      getUsers();
    };
  }, []);

  return { users, loading };
};

export default useUsers;
