import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create Rule",
  //   Description for Login Page
  description: "Create Rule Page for the WAIDS Web Application.",
};

export default async function CreateRuleLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return <>{children}</>;
}
