"use client";
import { Box, TextField, Container, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ResponsiveAppBar from "@/app/(authenticated)/components/ResponsiveAppBar";
import CollapsibleTable from "./component/CollapsibleTable";
import { useState } from "react";

export default function LogView() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="xl" sx={{ my: 2 }}>
        {/* Search Bar */}
        <TextField
          id="search"
          type="search"
          label="Search"
          value={searchTerm}
          onChange={handleChange}
          sx={{ width: "100%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Log Table */}
        <CollapsibleTable />
      </Container>
    </Box>
  );
}
