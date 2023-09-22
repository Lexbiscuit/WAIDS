import { ResponsiveLine } from "@nivo/line";
import * as React from 'react';
import { Typography } from "@mui/material";

const getTimeData = async (id) => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/dashboard/MyResponsiveLine?id=" + id,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch logs.");

    return res.json();
  } catch (error) {
    console.log("Error getting logs: ", error);
  }
};

const MyResponsiveLine = ({ id, time }) => {
  const [logData, setLogData] = React.useState(null);

  React.useEffect(() => {
    setInterval(() => {
      getTimeData(id).then((data) => {
        setLogData(data.data);
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
    <ResponsiveLine
      data={[{"id": "Suricata", "data": logData}]}
      margin={{ top: 30, right: 80, bottom: 80, left: 80 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: `${time}`,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "intrusions",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      useMesh={true}
    />
  );
};

export default MyResponsiveLine;
