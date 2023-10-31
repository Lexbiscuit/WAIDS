import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";

const data = [
  {
    title: "Suricata",
    location: "localhost",
    status: "Active",
  },
];

const IDSSourcesPage = async () => {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Button
        variant="contained"
        href=""
        sx={{
          m: 3,
        }}
      >
        Add new IDS
      </Button>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {data.map((e, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Item {...e} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default IDSSourcesPage;

function Item(props) {
  const typoHeaderStyle = {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 0.5,
    fontWeight: "bold",
    fontSize: "1.5rem",
  };

  const typoBodyStyle = {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 0.5,
  };

  return (
    <Card
      sx={{
        minHeight: "10rem",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Typography sx={typoHeaderStyle}>Name: {props.title}</Typography>
        <Typography sx={typoBodyStyle}>Location: {props.location}</Typography>
        <Typography sx={typoBodyStyle}>
          Status: {props.status}
          {props.status == "Active" ? (
            <CircleIcon sx={{ color: "green" }} />
          ) : (
            <CircleIcon
              sx={{
                color: "red",
              }}
            />
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid width="100%">
          <Grid item xs={12}>
            <Button
              size="small"
              sx={{ justifyContent: "start" }}
              href={`/idssources/${props.title}`}
            >
              Modify Rules
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
