"use client";
import { useState, useEffect } from "react";
import TanstackTable from "@/app/_components/TanstackTable";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import MenuMUI from "./MenuMUI";

// timestamp, alert.severity, src_ip, src_port, dest_ip, dest_port, event_type
// custom: action taken, description

export default function LogviewerTable() {
  const { data, status, isFetching } = useQuery({
    queryKey: ["fetchLogviewerTable"],
    queryFn: async () => {
      const { data } = await axios.get("/api/logviewer/TableData");
      return data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

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
      header: "Src IP",
      accessorKey: "src_ip",
      cell: ({ row, getValue }) => getValue(),
    },
    {
      header: "Src Port",
      accessorKey: "src_port",
      cell: ({ row, getValue }) => getValue(),
    },
    {
      header: "Dest IP",
      accessorKey: "dest_ip",
      cell: ({ row, getValue }) => getValue(),
    },
    {
      header: "Dest Port",
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

  if (isFetching) return <h1>Loading...</h1>;
  if (status === "error") return <h1>An error occured</h1>;
  if (status === "success") {
    return <TanstackTable data={data} columns={columns} />;
  }
}
