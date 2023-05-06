import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Stack,
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";

function createData(
  claimId: number,
  projectId: number,
  currencyId: string,
  amount: number,
  status: string,
  expenseDate: Date,
  purpose: string
) {
  return { claimId, projectId, currencyId, amount, status, expenseDate, purpose };
}

const rows = [
  createData(11147, 10001, "SGD", 123, "pending", new Date(), "Purpose 1"),
  createData(11148, 10001, "SGD", 123, "pending", new Date(), "Purpose 2"),
  createData(11149, 10001, "SGD", 256, "approved", new Date(), "Purpose 3"),
  createData(11150, 10001, "SGD", 26, "rejected", new Date(), "Purpose 4"),
];

function getFontColor(value: string) {
  if (value == "rejected" || value == "Rejected") {
    return "red";
  } else if (value == "accepted" || value == "Accepted") {
    return "#194D33";
  } else if (value == "pending" || value == "Pending") {
    return "grey";
  }
}

function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete the claim?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Delete</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function Dashboard() {
  // for delete dialogue
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const [currencies, setCurrencies] = useState([]);

  const getCurrencies = async () => {
    return await axios.get("http://localhost:8080/api/currencies").then((response) => {
      console.log('====== data', response.data);
       setCurrencies(response.data)
     })
   }

   if(currencies.length === 0) {
    getCurrencies();
   }

  //   const [claims, setClaims] = useState([]);
  //   useEffect(() => {
  //     getClaims();
  //   }, []);

  //   function getClaims() {
  //     axios.get("<api get>").then(function (response) {
  //       console.log(response.data);
  //       setClaims(response.data);
  //     });
  //   }

  // const deleteClaim = (id) => {
  //     axios
  //       .delete(`http://127.0.0.1:5000/userdelete/${id}`)
  //       .then(function (response) {
  //         console.log(response.data);
  //         getUsers();
  //       });
  //     alert("Successfully Deleted");
  //   };

  return (
    <div className="">
      <Typography
        sx={{
          fontFamily: "Quicksand",
          p: { xs: 2, md: 3 },
          fontWeight: "medium",
          ml: 23,
        }}
        variant="h5"
        color="inherit"
        noWrap
      >
        List of Claims
      </Typography>
      {/* component={Paper} */}
      <Typography sx={{ alignItems: "center", ml: 25, mr: 23 }}>
        <TableContainer>
          <Table
            sx={{ align: "center" }}
            size="small"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Claim ID</TableCell>
                <TableCell align="center">Project ID</TableCell>
                <TableCell align="center">Currency</TableCell>
                <TableCell align="center">Amount</TableCell>
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
                  <TableCell align="center" sx={{ p: { xs: 2 } }}>
                    {row.projectId}
                  </TableCell>
                  <TableCell align="center" sx={{ p: { xs: 2 } }}>
                    {row.currencyId}
                  </TableCell>
                  <TableCell align="center" sx={{ p: { xs: 2 } }}>
                    {row.amount}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      p: { xs: 2 },
                      color: getFontColor(row.status),
                    }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell align="center">
                    {/* <Link to="/editclaim">Edit</Link> */}
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        endIcon={<EditIcon />}
                        onClick={() =>
                          navigate("/editclaim", { state: { claim: row, currencies: currencies } })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        endIcon={<DeleteIcon />}
                        // onClick={() => AlertDialog()}
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
      </Typography>
      <Button
                        onClick={() =>
                          navigate("/createclaim", { state: { currencies: currencies } })
                        }
        variant="contained"
        color="success"
        sx={{ ml: 25, fontWeight: "thick" }}
        startIcon={<AddIcon sx={{ color: "#ffffff !important" }} />}
      >
        Add new claim
      </Button>
    </div>
  );
}
