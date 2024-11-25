'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  Select,
  MenuItem,
  TextField,

  TablePagination,
} from '@mui/material';
import CreateInvoice from '../components/CreateInvoice';
import { format } from 'date-fns';
import Loading from '../loading';

const statusColors = {
  'Awaiting Approval': 'info',
  Open: 'primary',
  Approved: 'success',
  'Vendor not found': 'error',
  Processing: 'warning',
  Paid: 'success',
  Rejected: 'error',
  Duplicate: 'default',
  Void: 'default',
};

const Invoice = () => {
  const [rows, setRows] = useState([]); 
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/invoice');
        const data = await response.json();
        setRows(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);



  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const formatDate = (date) => {
    return format(new Date(date), 'dd-MM-yyyy');
  };

  const filteredRows = rows.filter((row) => {
    const statusMatches = statusFilter ? row.status === statusFilter : true;
    const searchMatches =
      row.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatches && searchMatches;
  });

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return <Loading />; 
  }

  return (
    <Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <CreateInvoice />
        <Box sx={{ display: 'flex', gap: '16px' }}>

          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            size="small"
            displayEmpty
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Awaiting Approval">Awaiting Approval</MenuItem>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Vendor not found">Vendor not found</MenuItem>
            <MenuItem value="Duplicate">Duplicate</MenuItem>
            <MenuItem value="Void">Void</MenuItem>
          </Select>


          <TextField
            label="Search by Vendor or Invoice No"
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={{ width: 270 }}
          />
        </Box>
      </Box>


      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>

              <TableCell>Vendor Name</TableCell>
              <TableCell>Invoice</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Net Amount</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Department</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row,index) => (
              <TableRow key={index}>

                <TableCell>
                  <Typography variant="subtitle2">{row.vendorName}</Typography>
                  {row.vendorId }
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">No: {row.invoiceNo}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {row.internalId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusColors[row.status]}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{row.netAmount}</TableCell>
                <TableCell>{formatDate(row.invoiceDate)}</TableCell>
                <TableCell>{formatDate(row.dueDate)}</TableCell>
                <TableCell>{row.department}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default Invoice;

