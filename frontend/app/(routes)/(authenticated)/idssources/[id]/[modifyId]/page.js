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

const ModifyRulePage = async ({ params }) => {
  const router = useRouter();
  const modifyId = params.modifyId;
  const [rule, setRule] = React.useState("");
  const [enabled, setEnabled] = React.useState();
  const ruleRef = React.useRef();

  const handleSubmit = () => {
    if (enabled) {
      fetch(`http://localhost:5000/rules/enable/${modifyId}`);
    } else {
      fetch(`http://localhost:5000/rules/disable/${modifyId}`);
    }
    fetch(`http://localhost:5000/rules/modify/${modifyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rule: ruleRef.current.value }),
    });
    alert("Rule modified successfully");
  };

  React.useEffect(() => {
    function fetchData() {
      fetch(`http://localhost:5000/rules/retrieve/${modifyId}`)
        .then((res) => res.json())
        .then((res) => {
          setEnabled(res.enabled);
          setRule(res.rule[0] == "#" ? res.rule.slice(2) : res.rule);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

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
            // value={rule}
            // onChange={(e) => setRule(e.target.value)}
            defaultValue={rule}
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

          <Button onClick={() => router.back()}>Go Back</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button
            onClick={() => {
              fetch(`http://localhost:5000/rules/delete/${modifyId}`)
                .then((res) => res.json())
                .then((res) => alert(res.message));

              router.back();
            }}
          >
            Delete
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default ModifyRulePage;
