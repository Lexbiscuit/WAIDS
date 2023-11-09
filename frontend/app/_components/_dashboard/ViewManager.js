import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import RemoveIcon from "@mui/icons-material/Remove";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TextField, MenuItem } from "@mui/material";
import ChartItem from "./ChartItem";
import Title from "./Title";
import MyResponsivePie from "./ResponsivePie";
import MyResponsiveLine from "./ResponsiveLine";
import MyResponsiveBar from "./ResponsiveBar";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ViewManager({ views, setViews }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Manage Views
        </DialogTitle>
        <DialogContent>
          <ViewManagerList views={views} setViews={setViews} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function ViewManagerList({ views, setViews }) {
  const [openOptions, setOpenOptions] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [chartType, setChartType] = React.useState("");
  const [chartTitle, setChartTitle] = React.useState("");

  const addNewView = () => {
    let insertionIndex;
    for (let i = 0; i < 6; i++) {
      if (views[i].title == "EMPTY") {
        insertionIndex = i;
        break;
      }
    }
    if (chartType == "pie") {
      views.splice(insertionIndex, 1, {
        title: `${chartTitle}`,
        component: (
          <ChartItem>
            <Title>{chartTitle}</Title>
            <MyResponsivePie id={category} />
          </ChartItem>
        ),
      });
      setViews([...views]);
      return;
    }
    if (chartType == "line") {
      views.splice(insertionIndex, 1, {
        title: `${chartTitle}`,
        component: (
          <ChartItem>
            <Title>{chartTitle}</Title>
            <MyResponsiveLine id={category} time={category} />
          </ChartItem>
        ),
      });
      setViews([...views]);
      return;
    }
    if (chartType == "bar") {
      views.splice(insertionIndex, 1, {
        title: `${chartTitle}`,
        component: (
          <ChartItem>
            <Title>{chartTitle}</Title>
            <MyResponsiveBar id={category} />
          </ChartItem>
        ),
      });
      setViews([...views]);
      return;
    }
  };

  if (views.length < 6) {
    for (let i = views.length; i < 6; i++) {
      views.push({ title: "EMPTY", component: <></> });
    }
  }
  return (
    <>
      <FullScreenDialog
        open={openOptions}
        close={() => setOpenOptions(false)}
        chartType={chartType}
        setChartType={setChartType}
        setCategory={setCategory}
        addNewView={addNewView}
        setChartTitle={setChartTitle}
      />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {views.map((view, pos) => {
          const labelId = `list-label-${pos}`;

          return (
            <ListItem
              key={pos}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="remove"
                  onClick={() => {
                    views.splice(pos, 1);
                    setViews([...views]);
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              }
              disablePadding
            >
              {view.title == "EMPTY" ? (
                <ListItemButton dense onClick={() => setOpenOptions(true)}>
                  <ListItemText
                    id={labelId}
                    primary={`View ${pos}: [${view.title}]`}
                  />
                </ListItemButton>
              ) : (
                <ListItemButton dense>
                  <ListItemText
                    id={labelId}
                    primary={`View ${pos}: [${view.title}]`}
                  />
                </ListItemButton>
              )}
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog({
  open,
  close,
  chartType,
  setChartType,
  setCategory,
  addNewView,
  setChartTitle,
}) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }} color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            View Options
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <TextField
            id="outlined-title"
            label="Chart Title"
            defaultValue=""
            helperText="Please enter chart title"
            onChange={(e) => {
              setChartTitle(e.target.value);
            }}
          >
            <MenuItem value="pie">Pie Chart</MenuItem>
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="bar">Bar Chart</MenuItem>
          </TextField>
        </ListItem>
        <Divider />
        <ListItem>
          <TextField
            id="outlined-select-chart"
            select
            label="Chart Type"
            defaultValue=""
            helperText="Please select chart type"
            onChange={(e) => {
              setChartType(e.target.value);
              setCategory("");
            }}
          >
            <MenuItem value="pie">Pie Chart</MenuItem>
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="bar">Bar Chart</MenuItem>
          </TextField>
        </ListItem>
        <Divider />
        <ListItem>
          <TextField
            id="outlined-select-category"
            select
            label="Category"
            defaultValue=""
            helperText="Please select category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {chartType == "pie" ? (
              [
                <MenuItem value="protocol">Protocol</MenuItem>,
                <MenuItem value="priority">Priority</MenuItem>,
              ].map((item) => item)
            ) : chartType == "line" ? (
              [
                <MenuItem value="month">
                  Intrusion/month (recent year)
                </MenuItem>,
                <MenuItem value="year">Intrusion/year</MenuItem>,
              ].map((item) => item)
            ) : chartType == "bar" ? (
              <MenuItem value="classification">Classification count</MenuItem>
            ) : null}
          </TextField>
        </ListItem>
        <Divider />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addNewView();
            close();
          }}
        >
          APPLY
        </Button>
      </List>
    </Dialog>
  );
}
