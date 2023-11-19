import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Investigations",
  //   Description for Login Page
  description: "Investigations Page for the WAIDS Web Application.",
};

export default async function InvestigationsLayout({ children }) {
  const session = await getServerSession(authOptions);
  //if (!session) redirect("/login");
  if (!session) redirect("/");
  return <>{children}</>;
}
