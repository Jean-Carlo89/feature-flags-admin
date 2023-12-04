"use client";
import { useGlobalContext } from "@/app/Context/user.store";
import React, { useEffect, useState } from "react";

export default function WelcomeUser() {
  const { user, setUser } = useGlobalContext();

  return <div>Bem vindo, {user?.name}</div>;
}
