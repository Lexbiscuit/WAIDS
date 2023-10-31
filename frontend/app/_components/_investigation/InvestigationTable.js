"use client";
import { useState, useEffect } from "react";
import TanstackTable from "@/app/_components/TanstackTable";
import { getData } from "@/app/_utils/getData";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
// datetime - flow_id - interface - severity - proto
// who started the investigation, who is doing the investigation
// status of investigation - pending (red), ongoing (yellow), completed (green), cancelled (grey)

export default function InvestigationTable() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const Status = ({ id, value }) => {
    const [selectedOption, setSelectedOption] = useState(value);

    const updateDb = async () => {
      const res = await fetch("/api/investigation/create", {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          value: selectedOption,
        }),
      }).catch((err) => console.error(err));
    };

    return (
      <select
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          updateDb();
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
      header: "Flow ID",
      accessorKey: "_doc.flow_id",
      cell: ({ row, getValue }) => getValue(),
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
      header: "Comment",
      accessorKey: "description",
      cell: ({ row, getValue }) => (
        <Button
          variant="contained"
          onClick={() => {
            alert(getValue());
          }}
        >
          Description
        </Button>
      ),
    },
    {
      id: "details",
      cell: ({ row, getValue }) => (
        <Button
          variant="contained"
          onClick={() => {
            const url = row.original._doc._id;
            router.push("/investigation/" + url);
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  const fetchData = async () => {
    const data = await getData("investigation/fetchData");
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TanstackTable data={data} columns={columns} />
    </>
  );
}