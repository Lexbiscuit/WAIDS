import { List, ListItem, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";

export async function fetchLogs() {
  const res = await fetch("http://localhost:5000/fetchAllLogs");
  const data = await res.json();
  return data;
}

export default function LiveLogFeed() {
  const [Logs, setLogs] = useState(null);

  useEffect(() => {
    setInterval(() => {
      fetchLogs().then((data) => {
        setLogs(data);
      });
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
      {Logs.map((myLog, i) => (
        <ListItem key={i}>
          <Typography variant="body1" color="inherit">
            {myLog.time["$date"]} - {myLog.classification}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}
