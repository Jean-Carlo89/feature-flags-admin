import React from "react";

export default function SingleFlagPage() {
  const form__input_css = "text-black rounded-lg border-2  p-[20px] mx-[10px]";
  return (
    <div className="flex justify-items-center items-center rounded-lg  w-full h-full p-[20px]">
      <form className="flex flex-col mx-auto  bg-[#CBD5E1]    text-black w-[90%] h rounded-lg p-[10px] min-h-[30%]">
        <label className="text-[18px] mx-[10px]">Nome</label>
        <input type="text" className={form__input_css} name="name"></input>
        <label className="text-[18px] mx-[10px]">Descrição</label>
        <input type="text" className={form__input_css} name="descrição"></input>
        <label className="text-[18px] mx-[10px]">Estado</label>
        <select className={form__input_css} name="estado">
          <option value={true}>Ativo</option>
          <option value={false}>Inativo</option>
        </select>

        <button className="w-full p-[20px] my-5 bg-orange-400 text-white 0 rounded-[5px]">Atualizar Feature Flag</button>
      </form>
    </div>
  );
}
