import * as React from "react";
import {
  TableCell,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Typography,
  CardContent,
  Card,
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";

const getDateString = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

const getTimeString = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString();
};

export default function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {getDateString(row.timestamp) + " " + getTimeString(row.timestamp)}
        </TableCell>
        <TableCell align="left">{row.flow_id}</TableCell>
        <TableCell align="left">{row.alert.signature}</TableCell>
        <TableCell align="left">{row.alert.severity}</TableCell>
        <TableCell align="left">{row.proto}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Details
                  </Typography>
                  <Grid container spacing={2}>
                    {row && (
                      <Typography>
                        <pre>{JSON.stringify(row, null, 2)}</pre>
                      </Typography>
                    )}
                  </Grid>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    timestamp: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    protocol: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    generator_id: PropTypes.number.isRequired,
    signature_id: PropTypes.number.isRequired,
    signature_rev_id: PropTypes.number.isRequired,
    classification: PropTypes.string.isRequired,
    src_addr: PropTypes.string.isRequired,
    src_port: PropTypes.number.isRequired,
    dst_addr: PropTypes.string.isRequired,
    dst_port: PropTypes.number.isRequired,
  }).isRequired,
};
