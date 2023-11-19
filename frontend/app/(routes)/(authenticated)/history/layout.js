import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "History",
  //   Description for History Page
  description: "Get History Page for the WAIDS Web Application.",
};

export default async function HistoryLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
    return <>{children}</>;
}