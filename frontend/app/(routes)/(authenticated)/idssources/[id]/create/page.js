"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import { useRouter } from "next/navigation";

const AddRulePage = async () => {
  const router = useRouter();
  const [enabled, setEnabled] = React.useState(false);
  const ruleRef = React.useRef();

  const handleSubmit = () => {
    let idx;
    fetch("http://localhost:5000/rules/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rule: ruleRef.current.value,
        enabled: Boolean(enabled),
      }),
    })
      .then((res) => res.json())
      .then((res) => (idx = res.index))
      .catch((err) => console.log(err));

    alert("Rule created successfully");
  };

  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            router.back();
          }}
        >
          <TextField
            label="Rule"
            inputRef={ruleRef}
            required
            variant="outlined"
            multiline
            fullWidth
          />

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                />
              }
              label="Enable?"
            />
          </FormGroup>

          <Button onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default AddRulePage;
