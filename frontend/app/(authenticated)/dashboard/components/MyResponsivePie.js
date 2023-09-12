"use client";
import { ResponsivePie } from "@nivo/pie";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

async function getCategories(category) {
  const res = await fetch(
    "http://localhost:5000/fetchCategory?category=" + category
  );
  const data = await res.json();
  return data;
}

const MyResponsivePie = (props) => {
  const [logData, setLogData] = useState(null);

  useEffect(() => {
    setInterval(() => {
      getCategories(props.category).then((data) => {
        setLogData(data);
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
        <Box
          component="img"
          src="https://media.tenor.com/x1HJnh8484gAAAAC/anime-jump.gif"
          sx={{
            width: "40%",
          }}
        ></Box>
      </Box>
    );
  }
  return (
      <ResponsivePie
        data={logData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
      />
  );
};

export default MyResponsivePie;
