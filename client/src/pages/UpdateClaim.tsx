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

const UpdateClaim = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const claim = location.state.claim;

  console.log("==== claim", claim);

  const [initialClaim, setInitialClaim] = useState(!claim ? {
    expenseDate: dayjs(new Date()),
    amount: 0,
    currencyId: "",
    purpose: "",
  }: claim);

  console.log("==== initial claim", initialClaim);
  const [currencies, setCurrencies] = useState(['SGD', 'CNY', 'HKD', 'IDR', 'JPY', 'KHR', 'KRW', 'TWD', 'VND']);

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
    console.log(initialClaim);
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
        <tr>
          <td>
            <h3>Claim Date: </h3>
          </td>
          <SpacingTd></SpacingTd>
          <td>
            <DatePicker
              sx={{ width: "500px" }}
              format="DD-MM-YYYY"
              value={dayjs(initialClaim.expenseDate, {format: 'DD-MM-YYYY'})}
              maxDate={dayjs(new Date())}
              onChange={(value) =>
                setInitialClaim({
                  ...initialClaim,
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
            <Select
              labelId="select-currency"
              id="select-currency"
              value={initialClaim.currencyId}
              label="Currency"
              onChange={(event) =>
                setInitialClaim({
                  ...initialClaim,
                  currencyId: String(event.target.value),
                })
              }
              sx={{ width: "100px" }}
            >
              {currencies.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          <TextField sx={{width: '400px'}} id="txt_claimAmount" variant="outlined" type="number" value={claim ? initialClaim.amount : null} onChange={(event) => setInitialClaim({
            ...initialClaim,
            amount: Number(event.target.value)
          })}/>
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
              value={initialClaim.purpose}
              onChange={(event) =>
                setInitialClaim({
                  ...initialClaim,
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
