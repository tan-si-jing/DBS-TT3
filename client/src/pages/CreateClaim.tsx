import React, { useState } from "react";
import { ProjectExpensesClaims } from "../shared/models";
import { Button, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, Stack, TextField, styled } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {
  useNavigate,
} from 'react-router-dom';

interface Props {
  claim?: ProjectExpensesClaims
}


const CreateClaim = ({claim}: Props) => {

  const navigate = useNavigate();
  

  const [initialClaim, setInitialClaim] = useState({
    expenseDate: dayjs(new Date()),
    amount: 0,
    purpose: '',
    alternativeDeptCode: '',
    previousClaimId: 0,
  });

  const [hasFollowUp, setHasFollowUp] = useState(false);

  const radioBtnOnChange = (event: any) => {
    switch(event.target.value) {
      case 'yes': 
        return setHasFollowUp(true);
      case 'no':
        return setHasFollowUp(false);
      default:
        break;
    }
  }

  const onSubmit = () => {
    console.log(initialClaim);
  }

  return (
    <Grid   
    container
    spacing={0}
    direction="column"
    alignItems="center"
    style={{ minHeight: '100vh' }}>
      <h1>Create Claim</h1>

      <table>
        {/* <tr>
          <td>
          <h3>First Name:</h3>
          </td>
          <SpacingTd></SpacingTd>
          <td>
          <TextFieldStyled id="txt_firstName" variant="outlined" value={initialClaim.textFieldValue}/>
          </td>
        </tr>
        <tr>
          <td>
          <h3>Last Name:</h3>
          </td>
          <SpacingTd></SpacingTd>
          <td>
          <TextFieldStyled id="txt_lastName" variant="outlined" />
          </td>
        </tr> */}
        <tr>
          <td>
          <h3>Claim Date: </h3>
          </td>
          <SpacingTd></SpacingTd>
          <td>
          <DatePicker sx={{width: '500px'}} value={claim ? initialClaim.expenseDate : null} onChange={(value) => setInitialClaim({
            ...initialClaim,
            expenseDate: dayjs(value)
          })}/>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Claim Amount: </h3>
          </td>
          <SpacingTd></SpacingTd>
          <td>
          <TextFieldStyled id="txt_claimAmount" variant="outlined" type="number" value={claim ? initialClaim.amount : null} onChange={(event) => setInitialClaim({
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
            onChange={(event) => setInitialClaim({
              ...initialClaim,
              purpose: event.target.value
            })}
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
            <Stack direction='row'>            
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            </Stack>
          </RadioGroup>
          </td>
        </tr>
        {hasFollowUp &&         
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
              onChange={(event) => setInitialClaim({
                ...initialClaim,
                previousClaimId: Number(event.target.value)
              })}
              sx={{width: '500px'}}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </td>
          </tr>
        }
        <br />
        <CenterTr>
          <td>
            <Button variant="contained" size="large" onClick={() => onSubmit()}>Create</Button>
          </td>
          <SpacingTd />
          <td>
          <Button variant="contained" size="large" onClick={() => navigate(-1)}>Cancel</Button>
          </td>
        </CenterTr>
      </table>

    </Grid>
    );
};

export default CreateClaim;

const SpacingTd = styled('td')`
  padding: 10px;
`

const CenterTr = styled('tr')`
  text-align: center;
`

const TextFieldStyled = styled(TextField)`
  width: 500px;
`