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
import RuleBuilder from "@/app/_components/_idssources/RuleBuilder";

const AddRulePage = () => {
  const router = useRouter();
  const [enabled, setEnabled] = React.useState(false);
  const ruleRef = React.useRef();

  const handleSubmit = async () => {
    let idx;
    await fetch("http://159.223.47.93:5000/rules/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
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
        <h1>Create Rule</h1>
        <RuleBuilder />
      </Container>
    </Box>
  );
};

export default AddRulePage;
