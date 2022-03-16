import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { QueryResponse } from './types';
import { DataGrid, GridSortItem } from '@mui/x-data-grid';
import { Paper, Grid, Container } from '@mui/material';
import columns from './tableColumns'


const QUERY = gql`
  query ExampleQuery($page: Int, $size: Int, $sort: GridSortItem) {
    data(page: $page, size: $size, sort: $sort) {
      id,
      first_name,
      last_name,
      email,
      gender,
      avatar,
      company_name,
      job_title,
      language,
    }
  }
`;

function App() {
  const [size, setPageSize] = useState(20)
  const [page, setCurrentPage] = useState(0)
  const [sort, setSort] = useState<null | GridSortItem>(null)

  const { loading, data, fetchMore } = useQuery<QueryResponse>(
    QUERY, 
    {
      variables: {
        page,
        size,
        sort
      },
    }
  );

  useEffect(() => {
    fetchMore({
      variables: {
        page,
        size,
        sort
      },
    })
  }, [page, fetchMore, size, sort])

  return (
    <Container disableGutters>
      <Grid container maxWidth="xl">
        <Grid item xs={12}>
          <Paper
            sx={{
              height: '100vh'
            }}
          >
            <DataGrid
              rows={data?.data || []}
              rowCount={1000}
              columns={columns}
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
