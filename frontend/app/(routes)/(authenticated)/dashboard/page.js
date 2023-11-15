"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, Container, Grid } from "@mui/material";
import Appbar_auth from "@/app/_components/Appbar_auth";
import LiveLogFeed from "@/app/_components/_dashboard/LiveLogFeed";
import ResponsivePie from "@/app/_components/_dashboard/ResponsivePie";
import ChartItem from "@/app/_components/_dashboard/ChartItem";
import CreateChart from "@/app/_components/_dashboard/CreateChart";
import Title from "@/app/_components/_dashboard/Title";
import ResponsiveLine from "@/app/_components/_dashboard/ResponsiveLine";
import ResponsiveBar from "@/app/_components/_dashboard/ResponsiveBar";
import EventOverview from "@/app/_components/_dashboard/EventOverview";
import MyTabContext from "@/app/_components/_dashboard/MyTabContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Dashboard() {
  const allowedRoles = [
    "Network Administrator",
    "SOC Analyst",
    "IT Manager",
    "IR Team",
    "System Administrator",
  ];

  const {
    data,
    status: chartStatus,
    isFetching: chartIsFetching,
  } = useQuery({
    queryKey: ["fetchCharts"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/charts");
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
     // router.push("/login");
      router.push("/");
      return;
    }

    if (session.user.role === "Security Auditor") {
      router.push("/logviewer");
      return;
    }

    if (!allowedRoles.includes(session.user.role)) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (session && allowedRoles.includes(session.user.role)) {
    return (
      <Box component="main" height="100vh" overflow="auto">
        <Appbar_auth />
        <EventOverview />
        <MyTabContext>
          {/* CHARTS */}
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={0.5} m={0}>
              <CreateChart />
              <Grid
                item
                xs={12}
                sx={{ display: "flex", flexDirection: "row-reverse" }}
              ></Grid>
              {chartStatus == "success" &&
                data.charts.map((params, idx) => {
                  return <ChartItem {...params} key={idx} idx={idx} />;
                })}
              {/* LIVE LOG FEED */}
              <LiveLogFeed />
            </Grid>
          </Container>
        </MyTabContext>
      </Box>
    );
  }
  return null;
}
