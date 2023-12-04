"use client";
import { useGlobalContext } from "@/app/Context/user.store";
import React, { useEffect, useState } from "react";

export default function WelcomeUser() {
  const { user, setUser } = useGlobalContext();

  //   useEffect(() => {
  //     setUser({
  //       id: "lala",
  //       name: "Sharko",
  //     });
  //   });
  return <div>welcome-user, {user?.name}</div>;
}
