import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Modify Rule",
  //   Description for Login Page
  description: "Modify Rule Page for the WAIDS Web Application.",
};

export default async function ModifyRuleLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return <>{children}</>;
}
