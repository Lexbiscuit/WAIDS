import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Full Details",
  //   Description for Login Page
  description: "View Full Details.",
};

export default async function InvestigationItemLayout({ children }) {
  const session = await getServerSession(authOptions);
  //if (!session) redirect("/login");
  if (!session) redirect("/");
  return <>{children}</>;
}
