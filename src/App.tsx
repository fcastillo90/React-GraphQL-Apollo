import React, { useEffect, useMemo, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { QueryResponse } from './types';
import { DataGrid, GridSortItem } from '@mui/x-data-grid';
import { Paper, Grid, Container } from '@mui/material';
import columns from './tableColumns'


const QUERY = gql`
  query GetData($page: Int, $size: Int, $sort: GridSortItem) {
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

  const variables = useMemo(() => ({
    page,
    size,
    sort
  }), [page, size, sort]);

  const { loading, data, fetchMore } = useQuery<QueryResponse>(
    QUERY, { variables }
  );

  useEffect(() => {
    fetchMore({ variables })
  }, [fetchMore, variables])

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
