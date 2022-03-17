import React from 'react';
import { Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

interface ColumnState extends GridColDef {
  visible: boolean;
}

interface ToggleProps {
  columnState: ColumnState[];
  hangleToggle: (checked: boolean, index: number) => void
}

function Toggle({columnState, hangleToggle}: ToggleProps) {
  return (
    <Paper>
      <FormGroup>
        {columnState.map((value, index) => {
          return (
            <FormControlLabel 
              key={value.field}
              control={<Checkbox checked={value.visible} />} 
              label={value.headerName as string} 
              onChange={(event) => hangleToggle(
                (event as React.ChangeEvent<HTMLInputElement>).target.checked, 
                index
              )}
            />
          )
        })}
      </FormGroup>
    </Paper>
  );
}

export default Toggle;
