"use client";
import TanstackTable from "../TanstackTable";
import MenuMUI from "./MenuMUI";
import { getData } from "@/app/_utils/getData";
import { useEffect, useState } from "react";

export default function UsersTable() {
  const [data, setData] = useState(null);
  const [changed, setChanged] = useState(false);

  const columns = [
    {
      header: "Id",
      accessorKey: "_id",
      cell: ({ getValue }) => getValue(),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ getValue }) => getValue(),
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ getValue }) => getValue(),
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ getValue }) => getValue(),
    },
    {
      id: "options",
      cell: ({ row }) => (
        <MenuMUI row={row} changed={changed} setChanged={setChanged} />
      ),
    },
  ];

  const fetchData = async () => {
    const data = await getData("users/UsersData");
    setData(data);
  };

  useEffect(() => {
    setChanged(false);
    fetchData();
  }, [changed]);

  if (data) {
    return <TanstackTable columns={columns} data={data} />;
  } else {
    return <>Loading table ...</>;
  }
}
