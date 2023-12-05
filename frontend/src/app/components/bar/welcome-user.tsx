"use client";
import { useGlobalContext } from "@/app/Context/user.store";
import React, { useEffect, useState } from "react";

export default function WelcomeUser() {
  const { user, setUser } = useGlobalContext();

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setUser(user);
  // });

  useEffect(() => {
    setLoading(true);
    if (localStorage.length !== 0) {
      const user_local = localStorage.getItem("user");
      if (!user_local) {
        return;
      }

      const list = JSON.parse(user_local as string);
      const { user, token } = list;
      setUser(user);
      setLoading(false);
      //  router.push("/dashboard/flags");
    }
  }, []);

  return <>{loading ? null : <div>Bem vindo, {user?.name || "Root Dev"}</div>}</>;
}
