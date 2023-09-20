import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import {redirect} from "next/navigation";

export const metadata = {
  title: "Log Viewer",
  //   Description for Login Page
  description: "View and manage NIDS log data.",
};

export default async function LogViewerLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login")
  return <>{children}</>;
}
