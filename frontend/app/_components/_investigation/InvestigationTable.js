"use client";
import { useState, useEffect } from "react";
import TanstackTable from "@/app/_components/TanstackTable";
import { getData } from "@/app/_utils/getData";
// datetime - flow_id - interface - severity - proto
// who started the investigation, who is doing the investigation
// status of investigation - pending (red), ongoing (yellow), completed (green), cancelled (grey)

export default function InvestigationTable() {
  const [data, setData] = useState([]);

  const columns = [
    {
      header: "Timestamp",
      accessorKey: "timestamp",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
    },
    {
      header: "Flow ID",
      accessorKey: "flow_id",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
    },
    {
      header: "Interface",
      accessorKey: "in_iface",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
    },
    {
      header: "Severity",
      accessorKey: "alert.severity",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
    },
    {
      header: "Protocol",
      accessorKey: "proto",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
    },
    {
      header: "HELLO",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
    },
  ];

  const fetchData = async () => {
    const data = await getData("investigations/fetchData");
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <TanstackTable data={data} columns={columns} />
    </>
  );
}
