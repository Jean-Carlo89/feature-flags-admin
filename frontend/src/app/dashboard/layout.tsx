import Bar from "../components/bar/bar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: DashboardLayoutProps) => {
  return (
    <main>
      <header className="text-3xl">Dashboard Boticário</header>
      <div className="flex flex-col border-orange-300 border-4 container h-[90vh] max-h-[2000px] max-w-[90vw] mt-5">
        <div className="flex h-full">
          <div className="w-[80px] border-blue-500 border-4">
            <Bar>children</Bar>
          </div>

          <div className="flex-grow border-green-600 border-4 flex flex-col">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
