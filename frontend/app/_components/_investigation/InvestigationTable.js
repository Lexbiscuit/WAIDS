"use client";
import { useState, useEffect } from "react";
import TanstackTable from "@/app/_components/TanstackTable";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MenuMUI from "@/app/_components/_investigation/MenuMUI";
// datetime - flow_id - interface - severity - proto
// who started the investigation, who is doing the investigation
// status of investigation - pending (red), ongoing (yellow), completed (green), cancelled (grey)

export default function InvestigationTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, status, isFetching } = useQuery({
    queryKey: ["fetchInvestigationTable"],
    queryFn: async () => {
      const { data } = await axios.get("/api/investigation/fetchData");
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const Status = (statusObject) => {
    const [selectedOption, setSelectedOption] = useState(statusObject.value);

    const updateStatus = useMutation({
      mutationFn: async (statusObject) => {
        return axios.put("/api/investigation/update", statusObject, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["fetchInvestigationTable"],
        });
      },
    });

    return (
      <select
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          console.log(e.target.value);
          updateStatus.mutate({ id: statusObject.id, status: e.target.value });
        }}
      >
        {["pending", "ongoing", "completed"].map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  };

  const columns = [
    {
      header: "Timestamp",
      accessorKey: "_doc.timestamp",
      cell: ({ row, getValue }) => new Date(getValue()).toLocaleString(),
    },
    {
      header: "ID",
      accessorKey: "_doc._id",
      cell: ({ row, getValue }) => <div>{getValue()}</div>,
    },
    {
      header: "Interface",
      accessorKey: "_doc.in_iface",
      cell: ({ row, getValue }) => getValue(),
    },
    {
      header: "Severity",
      accessorKey: "_doc.alert.severity",
      cell: ({ row, getValue }) => getValue(),
    },
    {
      header: "Protocol",
      accessorKey: "_doc.proto",
      cell: ({ row, getValue }) => getValue(),
    },
    {
      header: "Status",
      accessorKey: "investigation_status",
      cell: ({ row, getValue }) => (
        <Status id={row.original._id} value={getValue()} />
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row, getValue }) => <div>{getValue()}</div>,
    },
    {
      id: "options",
      cell: ({ row, getValue }) => <MenuMUI row={row} />,
    },
  ];

  if (isFetching) return <h1>Loading...</h1>;
  if (status === "error") return <h1>Error</h1>;
  if (status === "success" && data.length === 0) return <h1>No data</h1>;
  if (status === "success" && data.length > 0) {
    return <TanstackTable data={data} columns={columns} />;
  }
}
