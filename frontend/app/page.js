import { Container } from "@mui/material";
import NavBar from "@/app/components/NavBar.js";

const kazuya_url =
  "https://www.nme.com/wp-content/uploads/2022/08/tekken-8-evo.jpg";

const DesktopView = () => {
  return <Container sx={{ display: { xs: "none", md: "flex" } }}></Container>;
};

const MobileView = () => {
  return (
    <Container sx={{ display: { xs: "flex", md: "none" } }}>
      xs device
    </Container>
  );
};

export default function Index() {
  return (
    <>
      <NavBar />
      <DesktopView />
      <MobileView />
    </>
  );
}
