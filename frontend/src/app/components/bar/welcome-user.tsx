"use client";
import { useGlobalContext } from "@/app/Context/user.store";
import React, { useEffect, useState } from "react";

export default function WelcomeUser() {
  const { user, setUser } = useGlobalContext();

  // useEffect(() => {
  //   setUser(user);
  // });

  useEffect(() => {
    if (localStorage.length !== 0) {
      const user_local = localStorage.getItem("user");
      if (!user_local) {
        return;
      }

      const list = JSON.parse(user_local as string);
      const { user, token } = list;
      setUser(user);
      //  router.push("/dashboard/flags");
    }
  }, []);

  return <div>Bem vindo, {user?.name}</div>;
}
