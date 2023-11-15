import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "IDS Sources",
  //   Description for Login Page
  description: "Manage IDS Sources Page for the WAIDS Web Application.",
};

export default async function IDSSourcesLayout({ children }) {
  const session = await getServerSession(authOptions);
  //if (!session) redirect("/login");
  if (!session) redirect("/");
  return <>{children}</>;
}
