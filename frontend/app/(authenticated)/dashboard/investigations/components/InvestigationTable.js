"use client";
import { useState, useEffect } from "react";
import TanstackTable from "@/app/(authenticated)/components/TanstackTable";
import { fetchData } from "../lib/fetchData";
// datetime - flow_id - interface - severity - proto
// who started the investigation, who is doing the investigation
// status of investigation - pending (red), ongoing (yellow), completed (green), cancelled (grey)

export default function InvestigationTable() {
  const [data, setData] = useState([]);

  const columns = [
    { header: "Flow ID", accessor: "flow_id" },
    { header: "Signature", accessor: "alert.signature" },
    { header: "Category", accessor: "alert.category" },
  ];

  useEffect(() => {
    async function fetchAll() {
      const data = await fetchData();
      setData(data);
    }
    fetchAll();
  }, []);

  console.log(data);

  return (
    <>
      <TanstackTable data={data} columns={columns} />
    </>
  );
}
