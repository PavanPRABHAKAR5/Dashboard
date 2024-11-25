'use client';
import React, { use, useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const CreateInvoice = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    vendorName: '',
    invoiceNo: '',
    status: '',
    netAmount: '',
    invoiceDate: '',
    dueDate: '',
    department: '',
    poNumber: '',
  });



  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setNewInvoice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleCreateInvoice = async (event) => {
    event.preventDefault();

    if(!newInvoice.vendorName || !newInvoice.invoiceNo || !newInvoice.status || !newInvoice.netAmount || !newInvoice.invoiceDate || !newInvoice.dueDate || !newInvoice.department || !newInvoice.poNumber){
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(`/api/invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInvoice),
      });
      if (response.status === 200) {
        alert('Invoice Created');
        setOpenModal(false);

       // Reset form if necessary

        setNewInvoice({
          vendorName: '',
          invoiceNo: '',
          status: '',
          netAmount: '',
          invoiceDate: '',
          dueDate: '',
          department: '',
          poNumber: '',
        });
        window.location.reload();
      } else {
        alert('Failed to create invoice');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Error creating invoice');
    }
  };



  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  return (
    <Box>
      {/* Filters */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleModalOpen}
          sx={{ height: 'fit-content' }}
        >
          Create Invoice
        </Button>
      </Box>


      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="create-invoice-modal"
        aria-describedby="create-invoice-form"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Create New Invoice</Typography>


          <Box sx={{ mt: 2 }}>
            <TextField
              label="Vendor Name"
              name="vendorName"
              value={newInvoice.vendorName}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Invoice Number"
              name="invoiceNo"
              value={newInvoice.invoiceNo}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={newInvoice.status}
                onChange={handleInputChange}
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
            </FormControl>
            <TextField
              label="Net Amount"
              name="netAmount"
              value={newInvoice.netAmount}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="PO Number"
              name="poNumber"
              value={newInvoice.poNumber}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Department"
              name="department"
              value={newInvoice.department}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Invoice Date"
              type="date"
              name="invoiceDate"
              value={newInvoice.invoiceDate}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Due Date"
              type="date"
              name="dueDate"
              value={newInvoice.dueDate}
              onChange={handleInputChange}

              fullWidth
              sx={{ mb: 2 }}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateInvoice}
              fullWidth
            >
              Submit Invoice
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateInvoice;
