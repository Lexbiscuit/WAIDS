import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
  //   Description for Login Page
  description: "Dashboard Page for the WAIDS Web Application.",
};

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return <>{children}</>;
}
