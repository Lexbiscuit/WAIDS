import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function CreateChart() {
  const [open, setOpen] = React.useState(false);
  const [chartType, setChartType] = React.useState(null);
  const [matchValue, setMatchValue] = React.useState(null);
  const [chartCategory, setChartCategory] = React.useState(null);
  const [timeframe, setTimeframe] = React.useState(null);
  const [timeCategory, setTimeCategory] = React.useState(null);
  const queryClient = useQueryClient();
  const createChart = useMutation({
    mutationFn: async () => {
      return axios.post("/api/dashboard/CreateChart", {
        chartType,
        chartCategory,
        timeframe,
        timeCategory,
        matchValue,
      });
    },
    onSuccess: () => {
      alert("Chart successfully created");
      queryClient.invalidateQueries(["fetchCharts"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Chart
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Chart</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            id="createChartForm"
            onSubmit={() => {
              createChart.mutate();
              handleClose();
            }}
          >
            <FormControl sx={{ my: 3 }} fullWidth>
              <InputLabel>Chart Type</InputLabel>
              <Select
                labelId="chartType"
                id="chartType"
                value={chartType}
                label="chartType"
                onChange={(event) => setChartType(event.target.value)}
              >
                <MenuItem value={"pie"}>Pie</MenuItem>
                <MenuItem value={"bar"}>Bar</MenuItem>
                <MenuItem value={"line"}>Line</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ my: 3 }} fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                labelId="chartCategory"
                id="chartCategory"
                value={chartCategory}
                label="Age"
                onChange={(event) => setChartCategory(event.target.value)}
              >
                <MenuItem value={"event_type"}>Event Type</MenuItem>
                <MenuItem value={"src_ip"}>Source IP</MenuItem>
                <MenuItem value={"src_port"}>Source Port</MenuItem>
                <MenuItem value={"dest_ip"}>Destination IP</MenuItem>
                <MenuItem value={"dest_port"}>Destination Port</MenuItem>
                <MenuItem value={"proto"}>Protocol</MenuItem>
                <MenuItem value={"alert.signature"}>Alert Signature</MenuItem>
                <MenuItem value={"alert.category"}>Alert Category</MenuItem>
                <MenuItem value={"alert.severity"}>Alert Severity</MenuItem>
                <MenuItem value={"direction"}>Direction</MenuItem>
              </Select>
            </FormControl>

            {chartType == "line" && (
              <TextField
                sx={{ my: 3 }}
                label="Category Query"
                value={matchValue}
                onChange={(event) => setMatchValue(event.target.value)}
              />
            )}

            {chartType != "line" && (
              <FormControl sx={{ my: 3 }} fullWidth>
                <InputLabel>Timeframe</InputLabel>
                <Select
                  labelId="timeframe"
                  id="timeframe"
                  value={timeframe}
                  label="Timeframe"
                  onChange={(event) => setTimeframe(event.target.value)}
                >
                  <MenuItem value={"hour"}>Past hour</MenuItem>
                  <MenuItem value={"day"}>Past day</MenuItem>
                  <MenuItem value={"week"}>Past week</MenuItem>
                  <MenuItem value={"month"}>Past month</MenuItem>
                  <MenuItem value={"halfyear"}>Past half year</MenuItem>
                  <MenuItem value={"year"}>Past year</MenuItem>
                </Select>
              </FormControl>
            )}

            {chartType == "line" && (
              <FormControl sx={{ my: 3 }} fullWidth>
                <InputLabel>Time Category</InputLabel>
                <Select
                  labelId="timeCategory"
                  id="timeCategory"
                  value={timeCategory}
                  label="Age"
                  onChange={(event) => setTimeCategory(event.target.value)}
                >
                  <MenuItem value={"dayOfWeek"}>Day of Week</MenuItem>
                  <MenuItem value={"dayOfMonth"}>Day of Month</MenuItem>
                  <MenuItem value={"hourOfDay"}>Hour of Day</MenuItem>
                  <MenuItem value={"monthOfYear"}>Month of Year</MenuItem>
                  <MenuItem value={"weekOfMonth"}>Week of Month</MenuItem>
                  <MenuItem value={"year"}>Year of past 5 years</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="createChartForm" onClick={handleClose}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
