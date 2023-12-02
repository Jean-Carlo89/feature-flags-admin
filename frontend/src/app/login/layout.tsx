import Bar from "../components/bar/bar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};
export default function LoginLayout({ children }: DashboardLayoutProps) {
  return <div className="bg-orange-100 mx-auto  flex   ">{children}</div>;
}
