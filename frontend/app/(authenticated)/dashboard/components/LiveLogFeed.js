import { List, ListItem, Typography, Box } from "@mui/material";
import { React, useEffect, useState } from "react";

const getLogs = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/Dashboard/LiveLogFeed", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch logs.");

    return res.json();
  } catch (error) {
    console.log("Error getting logs: ", error);
  }
};

export default function LiveLogFeed() {
  const [Logs, setLogs] = useState(null);

  useEffect(() => {
    setInterval( async () => {
      const { data } = await getLogs();
      setLogs(data);
    }, 5000);
  }, []);

  if (!Logs)
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Typography variant="body1" color="inherit" textAlign="center">
          Loading...
        </Typography>
        <Box
          component="img"
          src="https://media.tenor.com/x1HJnh8484gAAAAC/anime-jump.gif"
          sx={{
            width: "80%",
          }}
        ></Box>
      </Box>
    );

  return (
    <List>
      {Logs.map((myLog, i) =>  {
        const date = new Date(myLog.timestamp);
        return (<ListItem key={i}>
          <Typography variant="body1" color="inherit">
            {date.toDateString()} - {myLog.classification}
          </Typography>
        </ListItem>)
})}
    </List>
  );
}
