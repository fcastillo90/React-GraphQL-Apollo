import React, { useEffect, useMemo, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { QueryResponse } from './types';
import { DataGrid, GridSortItem } from '@mui/x-data-grid';
import { Paper, Grid, Container, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import columns from './tableColumns'

function App() {
  const [size, setPageSize] = useState(20)
  const [page, setCurrentPage] = useState(0)
  const [sort, setSort] = useState<null | GridSortItem>(null)
  const [columnState, setColumnState] = useState(columns)

  const variables = useMemo(() => ({
    page,
    size,
    sort
  }), [page, size, sort]);


  const QUERY = gql`
  query GetData($page: Int, $size: Int, $sort: GridSortItem) {
    data(page: $page, size: $size, sort: $sort) {
      ${columnState.filter((value) => value.visible).map((value) => (value.field)).join()}
    }
  }
  `;

  const { loading, data, fetchMore } = useQuery<QueryResponse>(
    QUERY, { variables }
  );

  const handleToggleVisibility = (value: boolean, index: number) => {
    const newState = [...columnState]
    newState[index].visible = value
    setColumnState(newState)
  }


  useEffect(() => {
    fetchMore({ variables })
  }, [fetchMore, variables])

  return (
    <Container disableGutters maxWidth="xl">
      <Grid container maxWidth="xl" spacing="4">
        <Grid item xs={12} sm={2} md={1}>
          <Paper
            sx={{
              height: '95vh'
            }}
          >
            <FormGroup>
              {columnState.map((value, index) => {
                return (
                  <FormControlLabel 
                    key={value.field}
                    control={<Checkbox checked={value.visible} />} 
                    label={value.headerName} 
                    onChange={(event) => handleToggleVisibility(
                      (event as React.ChangeEvent<HTMLInputElement>).target.checked, 
                      index
                    )}
                  />
                )
              })}
            </FormGroup>
          </Paper>
        </Grid>
        <Grid item xs={12} sm md>
          <Paper
            sx={{
              height: '95vh'
            }}
          >
            <DataGrid
              rows={data?.data || []}
              rowCount={1000}
              columns={columnState.filter((value) => value.visible)}
              page={page}
              pageSize={size}
              loading={loading}
              rowsPerPageOptions={[10, 20, 50, 100]}
              disableColumnFilter
              disableColumnMenu
              sortingMode="server"
              paginationMode="server"
              onPageChange={(page) => setCurrentPage(page)}
              onPageSizeChange={(size) => setPageSize(size)}
              onSortModelChange={(model) => setSort(model[0])}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
