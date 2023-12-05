import LoginForm from "../components/login-form/login";
import { cookies } from "next/headers";
export default function LoginPage() {
  async function create_token_cookie(data: string) {
    "use server";
    cookies().set("token", data);
  }

  async function get_token_cookie() {
    "use server";
    const cookie = cookies().get("token");

    return cookie;
  }
  return (
    <div className="w-full h-[100vh] flex justify-items-center items-center ">
      <LoginForm setTokenCookie={create_token_cookie} getTokenCookie={get_token_cookie} />
    </div>
  );
}
