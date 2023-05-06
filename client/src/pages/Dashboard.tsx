import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(
  claimId: number,
  projectId: number,
  currencyId: string,
  status: string
) {
  return { claimId, projectId, currencyId, status };
}

const rows = [
  createData(11147, 10001, "SGD", "pending"),
  createData(11148, 10001, "SGD", "pending"),
  createData(11149, 10001, "SGD", "pending"),
  createData(11150, 10001, "SGD", "pending"),
];

// const deleteClaim = (id) => {
//     axios
//       .delete(`http://127.0.0.1:5000/userdelete/${id}`)
//       .then(function (response) {
//         console.log(response.data);
//         getUsers();
//       });
//     alert("Successfully Deleted");
//   };

export default function BasicTable() {
  return (
    <div>
      <h2>List of Claims</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Claim ID</TableCell>
              <TableCell align="center">Project ID</TableCell>
              <TableCell align="center">Currency</TableCell>
              <TableCell align="center">Status of claim</TableCell>
              {/* <TableCell align="center">Protein&nbsp;(g)</TableCell> */}
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.claimId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.claimId}
                </TableCell>
                <TableCell align="center">{row.projectId}</TableCell>
                <TableCell align="center">{row.currencyId}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                {/* <TableCell align="right">{row.protein}</TableCell> */}
                <TableCell align="center">
                  {/* <Link to="/editclaim">Edit</Link> */}
                  <Stack direction="row" spacing={1}>
                    <Button
                      component={Link}
                      to="/editclaim"
                      variant="outlined"
                      endIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      endIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
