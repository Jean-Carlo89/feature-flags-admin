"use client";

import { useEffect, useState } from "react";
import styles from "./loginForm.module.css";
import { useGlobalContext, user } from "@/app/Context/user.store";
import { useRouter } from "next/navigation";
import { ColorRing } from "react-loader-spinner";
import { UserInfo } from "os";

const LoginForm = () => {
  const [form, setForm] = useState<{ email: string; password: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useGlobalContext();

  useEffect(() => {
    if (localStorage.length !== 0) {
      const user_local = localStorage.getItem("user");

      if (!user_local) {
        return;
      } else {
        const list = JSON.parse(user_local as string);

        const { user, token } = list;
        setUser(user);
        router.push("/dashboard/flags");
      }
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const body = JSON.stringify({
        email: form.email,
        password: form.password,
      });

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("");
        }, 3000);
      });

      promise.then(() => {
        const user = { id: "test-id", name: "Mylon" };

        setUser(user);

        const token = "token-my-user";

        saveUser(token, user);
        setLoading(false);
        router.push("/dashboard/flags");
      });

      promise.catch(() => {
        alert("Erro ao fazer login");
      });

      // fetch(`${NEXT_FEATURE_FLAG_URL}`, {
      //   method: "POST",
      //   body: body,
      // }).then(() => {
      //   setLoading(false);
      // });
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
      <input disabled={loading} onChange={onChange} type="text" placeholder="username" name="username" value={form.email} className={input_css} />
      <input disabled={loading} onChange={onChange} type="password" placeholder="password" name="password" value={form.password} className={input_css} />

      <button className="p-[30px] rounded-lg  bg-white text-orange-500 border-0 cursor-pointer flex justify-items-center items-center">
        {/* <div className="mx-auto">{loading ? <ColorRing visible={true} height="40" width="40" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]} /> : "ffff"}</div> */}
        <div className="mx-auto"> {loading ? <ColorRing visible={true} height="40" width="40" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]} /> : "Login"}</div>
      </button>
      {/* {state && state} */}
    </form>
  );
};

export default LoginForm;
