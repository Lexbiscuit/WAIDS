import {
  Container,
  Grid,
  Box,
  Typography,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import NavBar from "@/app/components/NavBar.js";
import styles from "./home.module.css";
import FetchJokes from "./FetchJokes.js";

const ProductShowcase = () => {
  const kazuya_url =
    "https://www.nme.com/wp-content/uploads/2022/08/tekken-8-evo.jpg";

  return (
    <Grid container spacing={{ xs: 4, md: 2 }} className={styles.grid}>
      <Grid item xs={12} md={6} className={styles.gridItem}>
        <Typography variant="h3" color="initial">
          IMPROVISE. ADAPT. OVERCOME.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} className={styles.gridItem}>
        <Tooltip title="Are you ready?">
          <Box
            component="img"
            sx={{ width: "100%" }}
            alt="Some image."
            src={kazuya_url}
          ></Box>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

const QOTD = () => (
  <Card sx={{ width: "100%", height: "100%" }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Joke of the Day
      </Typography>
      <Typography variant="body2" color="initial">
        <FetchJokes />
      </Typography>
    </CardContent>
  </Card>
);

export default function Home() {
  return (
    <>
      <NavBar />
      <Container className={styles.root}>
        <ProductShowcase />

        <Grid container spacing={2} rowSpacing={2} className={styles.grid}>
          <Grid item xs={12} md={4} className={styles.gridItem}>
            <QOTD />
          </Grid>
          <Grid item xs={12} md={4} className={styles.gridItem}>
            <QOTD />
          </Grid>
          <Grid item xs={12} md={4} className={styles.gridItem}>
            <QOTD />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
