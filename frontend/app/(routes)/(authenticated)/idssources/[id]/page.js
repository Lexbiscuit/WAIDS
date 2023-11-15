import { Box, Container } from "@mui/material";
import RulesTable from "@/app/_components/_idssources/RulesTable";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";

const SpecificIdsPage = async () => {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <RulesTable />
      </Container>
    </Box>
  );
};

export default SpecificIdsPage;
