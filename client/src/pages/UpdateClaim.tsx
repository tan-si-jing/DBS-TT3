import React, { useState } from "react";
import { ProjectExpensesClaims } from "../shared/models";
import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

interface Props {
  claim?: ProjectExpensesClaims;
}

const UpdateClaim = ({ claim }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [newClaim, setNewClaim] = useState({
    expenseDate: dayjs(new Date()),
    amount: 0,
    purpose: "",
  });

  //   const onSave = async (e) => {
  //     e.preventDefault();
  //     try{
  //         await axios.put("<put api>"+ claimId, newClaim);
  //         navigate("/dashboard");
  //     } catch (err) {
  //         console.log(err)
  //     }
  //   }

  const onSubmit = () => {
    console.log(newClaim);
    navigate("/dashboard");
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <br />
      <h1>Edit Claim</h1>
      <br />

      <table>
        {/* <tr>
          <td>
            <h3>Claim ID: </h3>
          </td>
          <SpacingTd></SpacingTd>
          <td>
            <TextFieldStyled
              id="txt_claimAmount"
              variant="outlined"
              disabled={true}
              value={claim ? newClaim.amount : null}
              //   value="fkdlsfdkdlsfkfsd"
              onChange={(event) =>
                setNewClaim({
                  ...newClaim,
                  amount: Number(event.target.value),
                })
              }
            />
          </td>
        </tr> */}
        <tr>
          <td>
            <h3>Claim Date: </h3>
          </td>
          <SpacingTd></SpacingTd>
          <td>
            <DatePicker
              sx={{ width: "500px" }}
              value={claim ? newClaim.expenseDate : null}
              onChange={(value) =>
                setNewClaim({
                  ...newClaim,
                  expenseDate: dayjs(value),
                })
              }
            />
          </td>
        </tr>
        <tr>
          <td>
            <h3>Claim Amount: </h3>
          </td>
          <SpacingTd></SpacingTd>
          <td>
            <TextFieldStyled
              id="txt_claimAmount"
              variant="outlined"
              type="number"
              value={claim ? newClaim.amount : null}
              onChange={(event) =>
                setNewClaim({
                  ...newClaim,
                  amount: Number(event.target.value),
                })
              }
            />
          </td>
        </tr>
        <tr>
          <td>
            <h3>Purpose: </h3>
          </td>
          <SpacingTd></SpacingTd>
          <td>
            <TextFieldStyled
              multiline
              rows={4}
              maxRows={4}
              value={newClaim.purpose}
              onChange={(event) =>
                setNewClaim({
                  ...newClaim,
                  purpose: event.target.value,
                })
              }
            />
          </td>
        </tr>
        <br />
        <CenterTr>
          <td>
            <Button variant="contained" size="large" onClick={() => onSubmit()}>
              Save
            </Button>
          </td>
          <SpacingTd />
          <td>
            <Button
              variant="contained"
              size="large"
              color="error"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </td>
        </CenterTr>
      </table>
    </Grid>
  );
};

export default UpdateClaim;

const SpacingTd = styled("td")`
  padding: 10px;
`;

const CenterTr = styled("tr")`
  text-align: center;
`;

const TextFieldStyled = styled(TextField)`
  width: 500px;
`;
