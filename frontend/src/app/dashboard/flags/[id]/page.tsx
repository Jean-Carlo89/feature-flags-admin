"use client";
import { getFeatureFlag } from "@/app/services/feature-flags/FetureFlagApi";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FeatureFlag } from "../flag";

export default function SingleFlagPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    name: "a",
  });

  const [form, setForm] = useState({ name: "", description: "", is_active: false, created_at: null, updated_at: null });
  //let flag: FeatureFlag = {};

  useEffect(() => {
    const { id } = params;

    console.log(id);
    fetch(`/api/flags/${id}`)
      .then((res) => {
        // console.log("no fetch");

        res.json().then((res) => {
          console.log(res);
          setForm(res);

          console.log({ flag: form });
        });
      })
      .catch((error) => {
        console.log("no catch");
      });
    // });
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setForm((prev) => {
      let helper = { ...prev };

      helper[`${e.target.id}`] = e.target.value;

      return helper;
    });

    console.log(form);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { id } = params;

    console.log("entrou no from");
    try {
      fetch(`/api/flags/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          is_active: form.is_active === "true" ? true : false,
        }),
      });
    } catch (error) {
      alert("Não foi possível atualizar a flag");
    }
  }
  const form__input_css = "text-black rounded-lg border-2  p-[20px] mx-[10px]";
  return (
    <div className="flex justify-items-center items-center rounded-lg  w-full h-full p-[20px]">
      <form onSubmit={handleSubmit} className="flex flex-col mx-auto  bg-[#CBD5E1]    text-black w-[90%] h rounded-lg p-[10px] min-h-[30%]">
        <label className="text-[18px] mx-[10px]">Nome</label>
        <input type="text" onChange={onChange} className={form__input_css} id="name" value={form.name}></input>
        <label className="text-[18px] mx-[10px]">Descrição</label>
        <input type="text" onChange={onChange} className={form__input_css} name="descrição" id="description" value={form.description}></input>
        <label className="text-[18px] mx-[10px]">Estado</label>
        <select className={form__input_css} onChange={onChange} name="estado" id="is_active" value={form.is_active === true ? true : false}>
          <option value={true}>Ativa</option>
          <option value={false}>Inativa</option>
        </select>
        <label className="text-[18px] mx-[10px]">Criada em:</label>
        <input type="text" className={form__input_css} id="created_at" value={form.created_at?.substring(0, 10)} readOnly />

        <label className="text-[18px] mx-[10px]">Atualizada em:</label>
        <input type="text" className={form__input_css} id="updated_at" value={form.updated_at?.substring(0, 10)} readOnly />

        <button className="w-full p-[20px] my-5 bg-orange-400 text-white 0 rounded-[5px]">Atualizar Feature Flag</button>
      </form>
    </div>
  );
}
