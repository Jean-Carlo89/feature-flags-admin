"use client";

import { MdSearch } from "react-icons/md";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, DOMAttributes, KeyboardEventHandler } from "react";
//import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // const handleSearch = useDebouncedCallback((e) => {

  // }, 300);

  function handleSearch(e) {
    //**permite mudar a url */
    const params = new URLSearchParams(searchParams);

    params.set("page", 1);

    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  }

  //function onKeyEnter(e: KeyboardEvent<HTMLInputElement>) {}

  return (
    <div className="flex items-center g-[10px] bg-[#2e374a] p-[10px] rounded-[10px] max-w- max ">
      <MdSearch />
      <input type="text" placeholder="escreva aqui..." className="bg-transparent border-none" onChange={handleSearch} />
    </div>
  );
};

export default SearchBar;
