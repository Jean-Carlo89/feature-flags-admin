import Bar from "../components/bar/bar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="">
      <header className="text-3xl">Dashboard Boticário</header>
      <div className="flex flex-col   container h-[90vh] max-h-[2000px]  mt-5 rounded-[20px] overflow-hidden border-2">
        <div className="flex h-full  border-2 ">
          <div className="w-[80px]    ">
            <Bar>children</Bar>
          </div>

          <div className="flex-grow  bg-[#F1F2F5]  flex  ">{children}</div>
        </div>
      </div>
    </main>
  );
}
