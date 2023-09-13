import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {useEffect} from "react";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

async function fetchData(skip, limit) {
    const res = await fetch(`http://localhost:5000/fetchAllLogs?skip=${skip}&limit=${limit}`);
    const data = await res.json();
    return data;
  }  

async function fetchDocumentCount() {
    const res = await fetch(`http://localhost:5000/fetchDocumentCount`);
    const data = await res.json();
    return data;
}

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [documentCount, setDocumentCount] = React.useState(0);

  useEffect(() => {
    // skip = page * rowsPerPage
    // limit = skip + rowsPerPage
    setData([]);
    fetchData(page*rowsPerPage, rowsPerPage)
    .then((queryData) => {
      setData(queryData);
    });

    fetchDocumentCount()
    .then((queryData) => {
        setDocumentCount(queryData[0].count);
    });
  }, [page, rowsPerPage]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - documentCount) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
            <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Time</TableCell>
                <TableCell align="left">Signature ID</TableCell>
                <TableCell align="left">Priority</TableCell>
                <TableCell align="left">Protocol</TableCell>
            </TableRow>
            </TableHead>

        <TableBody>
          {
        //   (rowsPerPage > 0
        //     ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        //     : data
        //   )
          data.map((row, index) => {
            const row_date = new Date(row.time["$date"]);
            
            return (
            <TableRow key={index}>
              <TableCell align="left">
              {`${String(row_date.getDate()).padStart(2,'0')}
                  -
                  ${String(row_date.getMonth() + 1).padStart(2,'0')}
                  -
                  ${row_date.getFullYear()}`}
              </TableCell>
              <TableCell align="left">
              {`${row_date.toLocaleTimeString()}`}
              </TableCell>
              <TableCell align="left">
              {`${row.signature_id}`}
              </TableCell>
              <TableCell align="left">
              {`${row.priority}`}
              </TableCell>
              <TableCell align="left">
              {`${row.protocol}`}
              </TableCell>
            </TableRow>
          )})}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              colSpan={3}
              count={documentCount}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}