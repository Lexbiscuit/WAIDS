"use client";
import { ResponsivePie } from "@nivo/pie";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const getCategories = async (id) => {
  try {
    const res = await fetch("/api/dashboard/MyResponsivePie?id=" + id, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch logs.");

    return res.json();
  } catch (error) {
    console.log("Error getting logs: ", error);
  }
};

const MyResponsivePie = ({ id }) => {
  const [logData, setLogData] = useState(null);

  useEffect(() => {
    setInterval(() => {
      getCategories(id).then((data) => {
        setLogData(data);
      });
    }, 5000);
  }, []);

  if (!logData) {
    return (
      <Typography variant="body1" color="inherit" textAlign="center">
        Loading...
      </Typography>
    );
  }

  return (
    <ResponsivePie
      data={logData}
      colors={{ scheme: "category10" }}
      margin={{ top: 30, right: 70, bottom: 70, left: 70 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      fit={true}
    />
  );
};

export default MyResponsivePie;
