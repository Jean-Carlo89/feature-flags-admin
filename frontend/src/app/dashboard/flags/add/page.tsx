"use client";
import { ToastContainer, toast } from "react-toastify";
import { NEXT_FEATURE_FLAG_URL } from "@/app/api/flags/helper";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddFeatureFlag() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", is_active: false, created_at: null, updated_at: null });
  const router = useRouter();
  const form__input_css = "text-black rounded-lg border-2  p-[20px] mx-[10px]";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const body = JSON.stringify({
        name: form.name,
        description: form.description,
        is_active: verifyEstate(),
      });

      const response = await fetch(`${NEXT_FEATURE_FLAG_URL}`, {
        method: "POST",
        body: body,
      });

      const json = await response.json();

      if (json.status === 401) {
        alert("A sessão expirou");
        return router.push("/login");
      }

      if (json.status === 201) {
        alert("Flag criada com sucesso");
      }

      if (json.status !== 201) {
        alert("Não foi possível cadastrar a flag");
        return;
      }
    } catch (error) {
      console.error(error);
      console.log(error);
      alert(" Houve um erro ao fazer o cadastro");
    } finally {
      setLoading(false);
    }
  }

  function verifyEstate() {
    let result: boolean = form.is_active;

    try {
      if (typeof form.is_active === "boolean") {
        result = form.is_active;
      }

      if (typeof form.is_active === "string") {
        result = form.is_active = "true" ? true : false;
      }
    } catch (error) {
    } finally {
      return result;
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setForm((prev) => {
      let helper = { ...prev };

      helper[`${e.target.id}`] = e.target.value;

      return helper;
    });
  }

  return (
    <>
      {" "}
      <div className="  flex justify-items-center items-center rounded-lg  w-full h-full p-[20px]  ">
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto  bg-[#CBD5E1]    text-black w-[90%] h rounded-lg p-[10px] min-h-[30%]">
          <label className="text-[18px] mx-[10px]">Nome</label>
          <input disabled={loading} required type="text" onChange={onChange} className={form__input_css} id="name" value={form.name}></input>
          <label className="text-[18px] mx-[10px]">Descrição</label>
          <input disabled={loading} type="text" onChange={onChange} className={form__input_css} name="descrição" id="description" value={form.description}></input>
          <label className="text-[18px] mx-[10px]">Estado</label>
          <select disabled={loading} className={form__input_css} onChange={onChange} name="estado" id="is_active" value={typeof form.is_active === "boolean" ? form.is_active : typeof form.is_active === "string" ? (form.is_active === "true" ? true : false) : null}>
            <option value={true}>Ativa</option>
            <option value={false}>Inativa</option>
          </select>

          <button disabled={loading} className="w-full p-[20px] my-5 bg-orange-400 text-white 0 rounded-[5px] text-[20px]">
            Criar
          </button>
        </form>
      </div>
      {/* <div>
        <button onClick={notify}></button>
        <ToastContainer />
      </div> */}
    </>
  );
}
