import { ResponsiveLine as NivoLine } from "@nivo/line";
import * as React from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// const getTimeData = async (id) => {
//   try {
//     const res = await fetch("/api/dashboard/MyResponsiveLine?id=" + id, {
//       cache: "no-store",
//     });

//     if (!res.ok) throw new Error("Failed to fetch logs.");

//     return res.json();
//   } catch (error) {
//     console.log("Error getting logs: ", error);
//   }
// };

const ResponsiveLine = ({ id, time }) => {
  const { data, status, isFetching } = useQuery({
    queryKey: ["fetchLineChartData", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/dashboard/ResponsiveLine?id=${id}`
      );
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 10000,
  });

  // const [logData, setLogData] = React.useState(null);

  // React.useEffect(() => {
  //   setInterval(() => {
  //     getTimeData(id).then((data) => {
  //       setLogData(data);
  //     });
  //   }, 5000);
  // }, []);

  // if (!logData) {
  //   return (
  //     <Typography variant="body1" color="inherit" textAlign="center">
  //       Loading...
  //     </Typography>
  //   );
  // }

  if (isFetching) {
    return <Typography>Loading...</Typography>;
  }
  if (status == "error") {
    return <Typography>An error occured...</Typography>;
  }
  if (status == "success") {
    return (
      <NivoLine
        data={[{ id: "LogData", data: data }]}
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
  }
};

export default ResponsiveLine;
