"use client";
import { useState, useEffect } from "react";
import TanstackTable from "@/app/_components/TanstackTable";
import { getData } from "@/app/_utils/getData";

// timestamp, alert.severity, src_ip, src_port, dest_ip, dest_port, event_type
// custom: action taken, description

export default function LogviewerTable() {
  const [data, setData] = useState([]);

  const columns = [
    {
      header: "Timestamp",
      accessorKey: "timestamp",
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
      header: "Source IP",
      accessorKey: "src_ip",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
    },
    {
      header: "Source Port",
      accessorKey: "src_port",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
    },
    {
      header: "Destination IP",
      accessorKey: "dest_ip",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
    },
    {
      header: "Destination Port",
      accessorKey: "dest_port",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
    },
    {
      header: "Event Type",
      accessorKey: "event_type",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
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
