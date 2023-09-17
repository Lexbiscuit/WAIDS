import * as React from "react";
import {
  TableCell,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Typography, CardContent,
  Card, Grid
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
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="left">{row.protocol}</TableCell>
        <TableCell align="left">{row.priority}</TableCell>
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
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        Date: {getDateString(row.timestamp)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        Time: {getTimeString(row.timestamp)}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body1">
                        Generator ID: {row.generator_id}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body1">
                        Signature ID: {row.signature_id}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body1">
                        Signature REV ID:{row.signature_rev_id}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body1">
                        Priority: {row.priority}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        Description: {row.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        Classification: {row.classification}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        Protocol: {row.protocol}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        Source Address: {row.src_addr}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        Source Port: {row.src_port}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        Destination Address: {row.dst_addr}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        Destination Port: {row.dst_port}
                      </Typography>
                    </Grid>
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
