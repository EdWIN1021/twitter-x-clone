import { useContext, useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import { CurrentUser } from "../types";
import { AuthContext } from "../contexts/AuthContext";

const useUsers = () => {
  const [users, setUsers] = useState<CurrentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const data = [] as CurrentUser[];
      try {
        const q = query(
          collection(db, "users"),
          where("username", "not-in", [currentUser?.username, "support01"]),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => data.push(doc.data() as CurrentUser));

        console.log(data);
        setUsers(data);
      } catch (err) {
        console.log(err);
        // setError(err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();

    return () => {
      getUsers();
    };
  }, [currentUser?.username]);

  return { users, loading };
};

export default useUsers;
