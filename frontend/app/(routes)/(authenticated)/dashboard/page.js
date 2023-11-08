"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Box, Container, Grid } from "@mui/material";

import Appbar_auth from "@/app/_components/Appbar_auth";
import LiveLogFeed from "@/app/_components/_dashboard/LiveLogFeed";
import MyResponsivePie from "@/app/_components/_dashboard/MyResponsivePie";
import ChartItem from "@/app/_components/_dashboard/ChartItem";
import Title from "@/app/_components/_dashboard/Title";
import MyResponsiveLine from "@/app/_components/_dashboard/MyResponsiveLine";
import MyResponsiveBar from "@/app/_components/_dashboard/MyResponsiveBar";
import EventOverview from "@/app/_components/_dashboard/EventOverview";
import MyTabContext from "@/app/_components/_dashboard/MyTabContext";

export default function Dashboard() {
  const allowedRoles = ['Network Administrator', 'SOC Analyst', 'IT Manager', 'IR Team', 'System Administrator'];
  const [views, setViews] = useState([
    {
      title: "Protocol",
      component: (
        <ChartItem>
          <Title>Protocol</Title>
          <MyResponsivePie id="proto" />
        </ChartItem>
      ),
    },
    {
      title: "Severity",
      component: (
        <ChartItem>
          <Title>Priority</Title>
          <MyResponsivePie id="alert.severity" />
        </ChartItem>
      ),
    },
    {
      title: "Intrusion/month (recent year)",
      component: (
        <ChartItem>
          <Title>Intrusion/month (recent year)</Title>
          <MyResponsiveLine id="month" time="month" />
        </ChartItem>
      ),
    },
    {
      title: "Intrusion/year",
      component: (
        <ChartItem>
          <Title>Intrusion/year</Title>
          <MyResponsiveLine id="year" time="year" />
        </ChartItem>
      ),
    },
    {
      title: "Category count",
      component: (
        <ChartItem>
          <Title>Category count</Title>
          <MyResponsiveBar id="alert.category" />
        </ChartItem>
      ),
    },
  ]);

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
   
    if (status === 'loading') {
      return; 
    }
   
    if (!session) {
      router.push('/login'); 
      return;
    }

    if (session.user.role === 'Security Auditor') {
      router.push('/logviewer'); 
      return;
    }
   
    if (!allowedRoles.includes(session.user.role)) {
      router.push('/unauthorized'); 
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
              <Grid
                item
                xs={12}
                sx={{ display: "flex", flexDirection: "row-reverse" }}
              >
                {/* <ViewManager views={views} setViews={setViews} /> */}
              </Grid>
              {views.map((view) => view.component)}
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
