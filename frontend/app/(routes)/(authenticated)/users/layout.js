import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Manage Users",
  //   Description for Login Page
  description: "View and manage users.",
};

export default async function UsersLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return <>{children}</>;
}
