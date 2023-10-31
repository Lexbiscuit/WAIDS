"use client";
import * as React from "react";
import {
  Button,
  TextField,
  Slider,
  FormGroup,
  FormControl,
  Grid,
  Box,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Select from "@mui/material/Select";

const GridItem = ({ children, size }) => (
  <Grid item xs={size}>
    {children}
  </Grid>
);

const RuleTextField = ({ label, field, setField }) => (
  <TextField
    size="small"
    label={label}
    variant="outlined"
    value={field}
    onChange={(e) => setField(e.target.value)}
    fullWidth
  ></TextField>
);

const RuleNumberField = ({ label, field, setField }) => (
  <TextField
    type="number"
    size="small"
    label={label}
    variant="outlined"
    value={field}
    onChange={(e) => setField(e.target.value)}
    fullWidth
  ></TextField>
);

const RuleSelectField = ({ label, values, state, setState }) => {
  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={state}
          label={label}
          onChange={handleChange}
          size="small"
        >
          {values.map((value) => (
            <MenuItem value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default function RuleBuilder() {
  const [action, setAction] = React.useState();
  const [protocol, setProtocol] = React.useState();
  const [srcIp, setSrcIp] = React.useState();
  const [srcPort, setSrcPort] = React.useState();
  const [dstIp, setDstIp] = React.useState();
  const [dstPort, setDstPort] = React.useState();
  //   const [flow, setFlow] = React.useState();
  //   const [content, setContent] = React.useState();
  const [sid, setSid] = React.useState();
  const [rev, setRev] = React.useState();
  const [msg, setMsg] = React.useState();
  const [classtype, setClasstype] = React.useState();
  const [priority, setPriority] = React.useState();
  const ruleRef = React.useRef();

  const handleSubmit = () => {
    fetch("http://localhost:5000/rules/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({
        rule: ruleRef.current.textContent,
        enabled: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => alert(res.message));
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <GridItem size={4}>
          <RuleSelectField
            label="Action"
            values={[
              "alert",
              "log",
              "pass",
              "activate",
              "dynamic",
              "drop",
              "reject",
              "sdrop",
            ]}
            state={action}
            setState={setAction}
          />
        </GridItem>

        <GridItem size={4}>
          <RuleSelectField
            label="Protocol"
            values={["tcp", "udp", "icmp", "ip"]}
            state={protocol}
            setState={setProtocol}
          />
        </GridItem>

        <GridItem size={7}>
          <RuleTextField label="Source IP" field={srcIp} setField={setSrcIp} />
        </GridItem>

        <GridItem size={4}>
          <RuleNumberField
            label="Source Port"
            field={srcPort}
            setField={setSrcPort}
          />
        </GridItem>

        <GridItem size={7}>
          <RuleTextField
            label="Destination IP"
            field={dstIp}
            setField={setDstIp}
          />
        </GridItem>

        <GridItem size={4}>
          <RuleTextField
            label="Destination Port"
            field={dstPort}
            setField={setDstPort}
          />
        </GridItem>

        <GridItem size={2}>
          <RuleNumberField label="SID" field={sid} setField={setSid} />
        </GridItem>

        <GridItem size={2}>
          <RuleNumberField label="REV" field={rev} setField={setRev} />
        </GridItem>
        <GridItem size={4}>
          <RuleTextField
            label="Classtype"
            field={classtype}
            setField={setClasstype}
          />
        </GridItem>

        <GridItem size={2}>
          <RuleSelectField
            label="Priority"
            values={["1", "2", "3", "4", "5"]}
            state={priority}
            setState={setPriority}
          />
        </GridItem>

        <GridItem size={12}>
          <RuleTextField label="MSG" field={msg} setField={setMsg} />
        </GridItem>

        {/* <GridItem size={2}>
          <RuleSelectField
            label="Flow"
            values={[
              "stateless",
              "not_established",
              "established",
              "to_server",
              "to_client",
              "from_server",
              "from_client",
            ]}
            state={flow}
            setState={setFlow}
          />
        </GridItem> */}

        {/* <GridItem size={6}>
          <RuleSelectField
            label="Content"
            values={[
              "malware",
              "SQL injection",
              "URL",
              "custom",
              "credit card",
              "social security number",
            ]}
            state={content}
            setState={setContent}
          />
        </GridItem> */}
      </Grid>

      <Box sx={{ my: 2 }}>
        <TextField
          multiline
          minRows={4}
          variant="outlined"
          fullWidth
          ref={ruleRef}
          value={`${action ? action : ""} ${protocol ? protocol : ""} ${
            srcIp ? srcIp : ""
          } ${srcPort ? srcPort : ""} -> ${dstIp ? dstIp : ""} ${
            dstPort ? dstPort : ""
          } (${sid ? "sid: " + sid + ";" : ""} ${
            rev ? "rev: " + rev + ";" : ""
          } ${classtype ? "classtype: " + classtype + ";" : ""} ${
            priority ? "priority: " + priority + ";" : ""
          } ${msg ? "msg: '" + msg + "';" : ""})`}
          disabled
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
}
