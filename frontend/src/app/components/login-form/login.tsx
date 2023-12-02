"use client";

// import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";

const LoginForm = () => {
  //   const [state, formAction] = useFormState(authenticate, undefined);

  const input_css = "p-[30px] rounded-[5px] border-[2px] bg-orange-100 border-orange-100 mb-[20px]";
  return (
    <form className="p-[50px] rounded-[10px] w-[500px] bg-orange-400 h-[450px] flex flex-col justify-items-center mx-auto ">
      <input type="text" placeholder="username" name="username" className={input_css} />
      <input type="password" placeholder="password" name="password" className={input_css} />
      <button className="p-[30px] rounded-lg mt-[20px] bg-white text-orange-500 border-0 cursor-pointer text-[25px]">Login</button>
      {/* {state && state} */}
    </form>
  );
};

export default LoginForm;
