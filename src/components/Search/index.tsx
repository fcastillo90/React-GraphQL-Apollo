import React, { useState } from 'react';
import { Paper, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchProps {
  handleSearch: (props: any) => void
}

function Search({handleSearch}: SearchProps) {
  const [state, setState] = useState("")
  return (
    <Paper>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Search by first name</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          value={state}
          onChange={(event) => setState(event.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch(state)
            }
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleSearch(state)}
                edge="end"
              >
                 <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search by first name"
        />
      </FormControl>
    </Paper>
  );
}

export default Search;
