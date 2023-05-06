import React, { useEffect, useState } from "react";
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

const CreateClaim = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currencies: string[] = location.state.currencies ? location.state.currencies : [];

  const [initialClaim, setInitialClaim] = useState({
    ExpenseDate: dayjs(new Date()),
    Amount: 150,
    CurrencyID: "SGD",
    Purpose: '',
    ProjectID: '11177',
    EmployeeID: '10015',
    AlternativeDeptCode: '',
    ChargeToDefaultDept: false,
  });
  

  const [hasFollowUp, setHasFollowUp] = useState(false);

  const radioBtnOnChange = (event: any) => {
    switch (event.target.value) {
      case "yes":
        return setHasFollowUp(true);
      case "no":
        return setHasFollowUp(false);
      default:
        break;
    }
  };

  const onSubmit = async () => {
    console.log("====== submittedClaim: ", initialClaim);
    await axios.post("http://localhost:8080/api/claim", {
      amount: initialClaim.Amount,
      currencyID: initialClaim.CurrencyID,
      purpose: initialClaim.Purpose,
      projectID: '11177',
      employeeID: '10015',
      alternativeDeptCode: '',
      chargeToDefaultDept: false,
      expenseDate: initialClaim.ExpenseDate.format('YYYY-MM-DD HH:mm:ss')
    }).then((response) => {
      console.log('====== data', response.data);
     })
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
      <h1>Create Claim</h1>
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
              maxDate={dayjs(new Date())}
              value={initialClaim.ExpenseDate}
              onChange={(value) =>
                setInitialClaim({
                  ...initialClaim,
                  ExpenseDate: dayjs(value),
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
              value={initialClaim.CurrencyID}
              label="Currency"
              onChange={(event) =>
                setInitialClaim({
                  ...initialClaim,
                  CurrencyID: String(event.target.value),
                })
              }
              sx={{ width: "100px" }}
            >
              {currencies.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          <TextField sx={{width: '400px'}} id="txt_claimAmount" variant="outlined" type="number" value={initialClaim.Amount} onChange={(event) => setInitialClaim({
            ...initialClaim,
            Amount: 150
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
              value={initialClaim.Purpose}
              onChange={(event) =>
                setInitialClaim({
                  ...initialClaim,
                  Purpose: event.target.value,
                })
              }
            />
          </td>
        </tr>
        <tr>
          <td>
            <h3>Is this a follow-up of another claim?</h3>
          </td>
          <SpacingTd></SpacingTd>
          <td>
            <RadioGroup
              aria-labelledby="isClaim-label"
              name="isClaim-group"
              onChange={radioBtnOnChange}
            >
              <Stack direction="row">
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </Stack>
            </RadioGroup>
          </td>
        </tr>
        {hasFollowUp && (
          <tr>
            <td>
              <h3>Follow up of another claim:</h3>
            </td>
            <SpacingTd />
            <td>
              <Select
                labelId="select-claim"
                id="select-claim"
                value={10}
                label="Claim"
                onChange={(event) =>
                  setInitialClaim({
                    ...initialClaim,
                  })
                }
                sx={{ width: "500px" }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </td>
          </tr>
        )}
        <br />
        <CenterTr>
          <td>
            <Button variant="contained" size="large" onClick={() => onSubmit()}>
              Create
            </Button>
          </td>
          <SpacingTd />
          <td>
            <Button
              variant="contained"
              size="large"
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

export default CreateClaim;

const SpacingTd = styled("td")`
  padding: 10px;
`;

const CenterTr = styled("tr")`
  text-align: center;
`;

const TextFieldStyled = styled(TextField)`
  width: 500px;
`;
