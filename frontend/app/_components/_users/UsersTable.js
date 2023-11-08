"use client";
import TanstackTable from "../TanstackTable";
import MenuMUI from "./MenuMUI";
import { getData } from "@/app/_utils/getData";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { AddUserDialog } from "./MenuMUI";

export default function UsersTable() {
  const [data, setData] = useState(null);
  const [changed, setChanged] = useState(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

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
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => getValue(),
    },
    {
      id: "options",
      cell: ({ row }) => {
         // Check if the user is a System Administrator
        const isSystemAdmin = row.original.role === 'System Administrator';
        return <MenuMUI row={row} isSystemAdmin={isSystemAdmin} changed={changed} setChanged={setChanged} />;
      },
    }

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
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-1.2rem', marginRight: '1rem' }}>
          <Button variant="contained" color="primary" onClick={() => setIsAddUserDialogOpen(true)}>
            Add User
          </Button>
        </div>
        <AddUserDialog open={isAddUserDialogOpen} toggleDialog={() => setIsAddUserDialogOpen(!isAddUserDialogOpen)} />

        {data ? <TanstackTable columns={columns} data={data} /> : <>Loading table ...</>}
      </>
    );
  } else {
    return <>Loading table ...</>;
  }
}