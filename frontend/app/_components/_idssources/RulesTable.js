"use client";
import React, { useEffect, useState } from "react";
import TanstackTable from "../TanstackTable";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@mui/material";

export default function RulesTable() {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState([]);

  const columns = [
    {
      header: "ID",
      accessorKey: "index",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    },
    {
      header: "Rule",
      accessorKey: "rule",
      cell: (info) =>
        info.getValue()[0] == "#" ? info.getValue().slice(2) : info.getValue(),
      footer: (props) => props.column.id,
    },
    {
      header: "Enabled",
      accessorKey: "enabled",
      cell: (info) => (info.getValue() ? "True" : "False"),
      footer: (props) => props.column.id,
    },
    {
      header: "options",
      id: "options",
      cell: (info) => (
        <Button
          onClick={() => router.push(`${pathname}/${info.row.original.index}`)}
        >
          Options
        </Button>
      ),
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://159.223.47.93:5000/rules/retrieve");
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, []);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => router.push(`${pathname}/create`)}
        sx={{
          m: 2,
        }}
      >
        Create rule
      </Button>
      <TanstackTable data={data} columns={columns} />
    </>
  );
}
