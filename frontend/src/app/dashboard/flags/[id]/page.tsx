import { getFeatureFlag } from "@/app/services/feature-flags/FetureFlagApi";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default async function SingleFlagPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const flag = await getFeatureFlag({ id });

  const form__input_css = "text-black rounded-lg border-2  p-[20px] mx-[10px]";
  return (
    <div className="flex justify-items-center items-center rounded-lg  w-full h-full p-[20px]">
      <form className="flex flex-col mx-auto  bg-[#CBD5E1]    text-black w-[90%] h rounded-lg p-[10px] min-h-[30%]">
        <label className="text-[18px] mx-[10px]">Nome</label>
        <input type="text" className={form__input_css} value={flag.name}></input>
        <label className="text-[18px] mx-[10px]">Descrição</label>
        <input type="text" className={form__input_css} name="descrição" value={flag.description}></input>
        <label className="text-[18px] mx-[10px]">Estado</label>
        <select className={form__input_css} name="estado" value={flag.is_active === true ? true : false}>
          <option value={true}>Ativa</option>
          <option value={false}>Inativa</option>
        </select>
        <label className="text-[18px] mx-[10px]">Criada em:</label>
        <input type="text" className={form__input_css} value={flag.created_at?.substring(0, 10)} readOnly />

        <label className="text-[18px] mx-[10px]">Atualizada em em:</label>
        <input type="text" className={form__input_css} value={flag.updated_at?.substring(0, 10)} readOnly />

        <button className="w-full p-[20px] my-5 bg-orange-400 text-white 0 rounded-[5px]">Atualizar Feature Flag</button>
      </form>
    </div>
  );
}
