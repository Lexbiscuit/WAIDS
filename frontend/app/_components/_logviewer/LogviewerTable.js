"use client";
import { useState, useEffect } from "react";
import TanstackTable from "@/app/_components/TanstackTable";
import { getData } from "@/app/_utils/getData";
import MenuMUI from "./MenuMUI";

// timestamp, alert.severity, src_ip, src_port, dest_ip, dest_port, event_type
// custom: action taken, description

export default function LogviewerTable() {
  const [data, setData] = useState([]);

  const columns = [
    {
      header: "Timestamp",
      accessorKey: "timestamp",
      cell: ({ row, getValue }) => new Date(getValue()).toLocaleString(),
    },
    {
      header: "Severity",
      accessorKey: "alert.severity",
      cell: ({ row, getValue }) => getValue(),
    },
    {
      header: "Source IP",
      accessorKey: "src_ip",
      cell: ({ row, getValue }) => getValue(),
    },
    {
      header: "Source Port",
      accessorKey: "src_port",
      cell: ({ row, getValue }) => getValue(),
    },
    {
      header: "Destination IP",
      accessorKey: "dest_ip",
      cell: ({ row, getValue }) => getValue(),
    },
    {
      header: "Destination Port",
      accessorKey: "dest_port",
      cell: ({ row, getValue }) => getValue(),
    },
    {
      header: "Event Type",
      accessorKey: "event_type",
      cell: ({ row, getValue }) => getValue(),
    },
    {
      id: "options",
      cell: ({ row, getValue }) => <MenuMUI row={row} />,
    },
  ];

  const fetchData = async () => {
    const data = await getData("logviewer/TableData");
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <TanstackTable data={data} columns={columns} />;
}
