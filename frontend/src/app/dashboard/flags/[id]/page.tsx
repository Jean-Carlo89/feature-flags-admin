"use client";
import { getFeatureFlag } from "@/app/services/feature-flags/FetureFlagApi";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FeatureFlag } from "../flag";
import { FaRegTrashAlt } from "react-icons/fa";
import { NEXT_FEATURE_FLAG_URL } from "@/app/api/flags/helper";

export default function SingleFlagPage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState({ name: "", description: "", is_active: false, created_at: null, updated_at: null });

  const router = useRouter();
  //let flag: FeatureFlag = {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const { id } = params;
      setLoading(true);
      fetch(`/api/flags/${id}`)
        .then((res) => {
          res.json().then((res) => {
            setForm(res);
          });
        })
        .catch((error) => {});
      // });
    } catch (error) {
      alert("Erro Atualizando flag");
    } finally {
      setLoading(false);
    }
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setForm((prev) => {
      let helper = { ...prev } as any;

      helper[`${e.target.id}`] = e.target.value;

      return helper;
    });
  }
  //**Form select changes the is_active from boolean to string when it is changed */
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { id } = params;

    try {
      const body = JSON.stringify({
        name: form.name,
        description: form.description,
        is_active: verifyEstate(),
      });

      const response = await fetch(`${NEXT_FEATURE_FLAG_URL}/${id}`, {
        method: "PATCH",
        body: body,
      });

      const json = await response.json();

      if (json.status === 200) {
        alert("Flag atualizada com sucesso");
      } else {
        alert("Não foi possível atualizar  a flag");
      }
    } catch (error) {
      alert("Não foi possível atualizar a flag");
    }
  }

  function deleteFlag() {
    const { id } = params;

    const uri = NEXT_FEATURE_FLAG_URL;
    fetch(`${uri}/${id}`, { method: "DELETE" }).then(() => {
      router.push("/dashboard/flags");
    });
  }

  const form__input_css = "text-black rounded-lg border-2  p-[20px] mx-[10px]";
  return (
    <div className="  flex justify-items-center items-center rounded-lg w-full h-full flex-col">
      <div className="  w-full flex-col  mx-auto my-auto  flex justify-items-center items-center rounded-lg  p-[20px]  ">
        <div className="  flex w-full flex-row-reverse">
          <div className="   w-[40px] h-[40px] border-4   cursor-pointer mr-[5%] mb-[2%]" onClick={deleteFlag}>
            <FaRegTrashAlt size={35} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="   flex flex-col mx-auto  bg-[#CBD5E1]    text-black w-[90%] h rounded-lg p-[10px] min-h-[30%]">
          <label className="text-[18px] mx-[10px]">Nome</label>
          <input disabled={loading} type="text" onChange={onChange} className={form__input_css} id="name" value={form.name}></input>
          <label className="text-[18px] mx-[10px]">Descrição</label>
          <input disabled={loading} type="text" onChange={onChange} className={form__input_css} name="descrição" id="description" value={form.description}></input>
          <label className="text-[18px] mx-[10px]">Estado</label>
          <select disabled={loading} className={form__input_css} onChange={onChange} name="estado" id="is_active" value={typeof form.is_active === "boolean" ? form.is_active : typeof form.is_active === "string" ? (form.is_active === "true" ? true : false) : null}>
            <option value={true}>Ativa</option>
            <option value={false}>Inativa</option>
          </select>
          <label className="text-[18px] mx-[10px]">Criada em:</label>
          <input type="text" className={form__input_css} id="created_at" value={form.created_at?.substring(0, 10)} readOnly />

          <label className="text-[18px] mx-[10px]">Atualizada em:</label>
          <input type="text" className={form__input_css} id="updated_at" value={form.updated_at?.substring(0, 10)} readOnly />

          <button disabled={loading} className="w-full p-[20px] my-5 bg-orange-400 text-white 0 rounded-[5px]">
            Atualizar Feature Flag
          </button>
        </form>
      </div>
    </div>
  );
}
