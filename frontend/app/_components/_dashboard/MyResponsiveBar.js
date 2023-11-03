import { ResponsiveBar } from "@nivo/bar";
import * as React from "react";
import { Typography } from "@mui/material";

const getLogData = async (id) => {
  try {
    const res = await fetch("/api/dashboard/MyResponsiveBar?id=" + id, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch logs.");

    return res.json();
  } catch (error) {
    console.log("Error getting logs: ", error);
  }
};

const MyResponsiveBar = ({ id }) => {
  const [logData, setLogData] = React.useState(null);

  React.useEffect(() => {
    setInterval(async () => {
      getLogData(id).then((data) => {
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
    <ResponsiveBar
      data={logData}
      groupMode="grouped"
      indexBy="id"
      margin={{ top: 30, right: 70, bottom: 70, left: 70 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "category10" }}
      colorBy="indexValue"
      axisBottom={false}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
    />
  );
};

export default MyResponsiveBar;
