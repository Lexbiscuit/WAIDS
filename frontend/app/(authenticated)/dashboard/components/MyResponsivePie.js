"use client";
import { ResponsivePie } from "@nivo/pie";
import { React, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from 'next-themes';

const getCategories = async (id) => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/Dashboard/MyResponsivePie?id=" + id, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch logs.");

    return res.json();
  } catch (error) {
    console.log("Error getting logs: ", error);
  }
};

const MyResponsivePie = (props) => {
  const { theme, setTheme } = useTheme();
  const [logData, setLogData] = useState(null);

  useEffect(() => {
    setInterval(() => {
      getCategories(props.id).then((data) => {
        setLogData(data.data);
      });
    }, 5000);
  }, []);

  if (!logData) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="body1" color="inherit" textAlign="center">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <ResponsivePie
      data={logData}
      colors={{ scheme: "category10" }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            0.2
          ]
        ]
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            2
          ]
        ]
      }}
    />
  );
};

export default MyResponsivePie;
