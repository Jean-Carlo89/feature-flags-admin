"use client";

import { useEffect, useState } from "react";
import styles from "./loginForm.module.css";
import { useGlobalContext, user } from "@/app/Context/user.store";
import { useRouter } from "next/navigation";
import { ColorRing } from "react-loader-spinner";
import { UserInfo } from "os";
import { NEXT_FEATURE_FLAG_URL } from "@/app/api/flags/helper";
import { NEXT_FEATURE_USER_URL } from "@/app/api/users/user-helper";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type LoginFormProps = {
  setTokenCookie: (data: string) => Promise<void>;
  getTokenCookie: () => Promise<RequestCookie | undefined>;
};

const LoginForm = (props: LoginFormProps) => {
  const [form, setForm] = useState<{ email: string; password: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useGlobalContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const body = JSON.stringify({
        email: form.email,
        password: form.password,
      });

      const response = fetch(`${NEXT_FEATURE_USER_URL}`, {
        method: "POST",
        body: body,
      })
        .then((res) => {
          res
            .json()
            .then((res) => {
              const data = res;
              const { user, token } = data;
              if (!user) {
                alert("Houve um erro ao logar");
                setLoading(false);
                return;
              }
              saveUser(token, user);
              props.setTokenCookie(token);
              setLoading(false);
              router.push("/dashboard/flags");
            })
            .catch((e) => {
              setLoading(false);
            });
        })
        .catch((e) => {
          setLoading(false);
        });
    } catch (error) {
      alert("Erro ao fazer login");

      setLoading(false);
    }
  }

  function saveUser(token: string, user: user) {
    const infos = { token, user: user };

    const infosString = JSON.stringify(infos);
    localStorage.setItem("user", infosString);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setForm((prev) => {
      let helper = { ...prev };

      helper[`${e.target.id}`] = e.target.value;

      return helper;
    });
  }

  const input_css = "p-[30px] rounded-[5px] border-[2px] bg-orange-100 border-orange-100 ";
  return (
    <form onSubmit={handleSubmit} className="p-[50px] rounded-[10px] w-[500px] bg-orange-400 h-[500px] flex flex-col justify-items-center mx-auto gap-[30px]">
      <h1 className="text-[35px] mx-auto  text-white">Login</h1>
      <input disabled={loading} onChange={onChange} id="email" type="text" placeholder="username" name="username" value={form.email} className={input_css} />
      <input disabled={loading} onChange={onChange} id="password" type="password" placeholder="password" name="password" value={form.password} className={input_css} />

      <button className="p-[30px] rounded-lg  bg-white text-orange-500 border-0 cursor-pointer flex justify-items-center items-center">
        <div className="mx-auto">{loading ? <ColorRing visible={true} height="40" width="40" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]} /> : "Login"}</div>
      </button>
      {/* {state && state} */}
    </form>
  );
};

export default LoginForm;
