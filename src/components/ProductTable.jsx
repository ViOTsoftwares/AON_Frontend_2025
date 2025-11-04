import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData("Length", "137 cm (54')"),
  createData("Width", "87 cm (34')"),
  createData("Height", "92 cm (36')"),
  createData("Outer Material", "100% Polyster"),
  createData("Frame Material", "Solid Wood"),
  createData("Seating Capacity", "2 Seater"),
  createData("Colour", "Pride"),
  createData("Model", "Bae"),
  createData(
    "Assembly Required",
    "Easy Self Assembly with Simple Instruction Manual (Do it Yourself)"
  ),
  createData("Whats in the box", "Sofa, Assembly Instruction,Review Card"),
];

export default function ProductTable({ Product }) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ maxWidth: "100%", overflow: "hidden" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: "15px", fontWeight: "10px" }}>
              Bestseller Tag
            </TableCell>
            <TableCell align="left">New Launch</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Product?.Length && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Length
              </TableCell>
              <TableCell align="left">{Product?.Length} cm</TableCell>
            </TableRow>
          )}
          {Product?.Width && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Width
              </TableCell>
              <TableCell align="left">{Product?.Width} cm</TableCell>
            </TableRow>
          )}
          {Product?.Height && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Height
              </TableCell>
              <TableCell align="left">{Product?.Height} cm</TableCell>
            </TableRow>
          )}
          {Product?.Weight && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Weight
              </TableCell>
              <TableCell align="left">{Product?.Weight} kg</TableCell>
            </TableRow>
          )}
          {Product?.OuterMaterial && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Outer Material
              </TableCell>
              <TableCell align="left">{Product?.OuterMaterial}</TableCell>
            </TableRow>
          )}
          {Product?.FrameMaterial && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Frame Material
              </TableCell>
              <TableCell align="left">{Product?.FrameMaterial}</TableCell>
            </TableRow>
          )}
          {Product?.FabricType && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Fabric Type
              </TableCell>
              <TableCell align="left">{Product?.FabricType}</TableCell>
            </TableRow>
          )}
          {Product?.FinishType && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Finish Type
              </TableCell>
              <TableCell align="left">{Product?.FinishType}</TableCell>
            </TableRow>
          )}
          {Product?.Colour && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Colour
              </TableCell>
              <TableCell align="left">{Product?.Colour}</TableCell>
            </TableRow>
          )}
          {Product?.SeatingCapacity && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Seating Capacity
              </TableCell>
              <TableCell align="left">{Product?.SeatingCapacity}</TableCell>
            </TableRow>
          )}
          {Product?.AssemblyRequired && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Assembly Required
              </TableCell>
              <TableCell align="left">{Product?.AssemblyRequired}</TableCell>
            </TableRow>
          )}
          {Product?.WarrantyPeriod && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Warranty Type
              </TableCell>
              <TableCell align="left">{Product?.WarrantyPeriod}</TableCell>
            </TableRow>
          )}
          {Product?.WarrantyType && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "colour",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                Warranty Period
              </TableCell>
              <TableCell align="left">{Product?.WarrantyType}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
