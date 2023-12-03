"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxDashboard } from "react-icons/rx";

type MenuLinkProps = {
  children: React.ReactNode;
  href: string;
  className: string;
};

export default function MenuLink(props: MenuLinkProps) {
  const pathname = usePathname();

  return (
    <Link href={props.href}>
      <div className={pathname === props.href ? props.className + " bg-gray-400" : props.className}>{props.children}</div>
    </Link>
  );
}

// export default function MenuLink(props: MenuLinkProps) {
//   return (
//     <Link href="/dashboard">
//       <div className="text-black bg-gray-100 hover:bg-gray-300 cursor-pointer my-4 p-3 rounded-lg inline-block">
//         {props.children}
//         <RxDashboard size={25} />
//       </div>

//     </Link>
//   );
// }
