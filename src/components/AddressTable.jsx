import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Box,
} from "@mui/material";

const AddressTable = ({ address, handleisEdit }) => {
  const fields = [
    { label: "Full Name", value: address.fullName },
    { label: "Email", value: address.email },
    { label: "Phone", value: address.phone },
    { label: "Address", value: address.address },
    { label: "City", value: address.city },
    { label: "Postal Code", value: address.postalCode },
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        mt: 2,
      }}
    >
      <Table>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.label}>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "grey.100",
                  width: "35%",
                }}
              >
                {field.label}
              </TableCell>
              <TableCell>{field.value || "—"}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            
           
          </TableRow>
        </TableBody>
      </Table>
              <Box display="flex" justifyContent="flex-end" p={1}>
                <Button
                  onClick={handleisEdit}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
              </Box>
    </TableContainer>
  );
};

export default AddressTable;
