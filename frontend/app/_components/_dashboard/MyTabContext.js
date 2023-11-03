"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";

export default function MyTabContext(props) {
  const { children } = props;
  const [value, setValue] = React.useState("1");
  const [events, setEvent] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAlertSeverity = (severity) => {
    if (severity === 3) return "error"; // Red colour
    else if (severity === 2) return "warning"; // Yellow colour
    else if (severity === 1) return "info"; // Blue colour
    else if (severity === 0) return "success"; // Green colour
    return "error"; // default to "error" aka red colour if no match
  }; // Display the Severity by colour, red most rabak, green not rabak

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/dashboard/Alerts', { cache: "no-store" });
        const data = await response.json();
        data.sort((a, b) => b.alert.severity - a.alert.severity);
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      }
    };
    const intervalId = setInterval(fetchAlerts, 5000); // fetch every 5 seconds
    console.log(events)
    return () => clearInterval(intervalId); //cleanup on component unmount
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1", mx: 4 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Alert" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1">
        <TabPanel value="1">
          <div>
            <Box sx={{
              width: 'auto',
              height: 216,
              overflowY: 'auto',
              backgroundColor: '#f5f5f5',
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              '&:hover': {
                backgroundColor: '#eceff1',
              },
            }}
            >
              {events.map((event) => (
                <Box key={event._id.$oid} mb={0.8}>
                  <Alert variant="outlined" severity={getAlertSeverity(event.alert.severity)}>
                    Signature: {event.alert.signature} <br />
                    Category: {event.alert.category} <br />
                    Severity: {event.alert.severity}<br />
                    Timestamp: {event.timestamp}
                  </Alert>
                </Box>
              ))}
            </Box>
          </div>
          {children}
        </TabPanel>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
