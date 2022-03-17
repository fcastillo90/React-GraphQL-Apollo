import React, { useEffect, useMemo, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { QueryResponse } from './types';
import { DataGrid, GridSortItem } from '@mui/x-data-grid';
import { Grid, Container } from '@mui/material';
import columns from './tableColumns'
import Search from './components/Search';
import Toggle from './components/Toggle';
import Loading from './components/Loading';

function App() {
  const [size, setPageSize] = useState(10)
  const [page, setCurrentPage] = useState(0)
  const [sort, setSort] = useState<null | GridSortItem>(null)
  const [input, setInput] = useState("")
  const [columnState, setColumnState] = useState(columns)

  const QUERY = gql`
    query GetData($page: Int, $size: Int, $sort: GridSortItem, $search: String) {
      data(page: $page, size: $size, sort: $sort, search: $search) {
        list {
          ${columnState.filter((value) => value.visible).map((value) => (value.field)).join()}
        }
        totalQuery
      }
      total
    }
  `;
  const variables = useMemo(() => ({
    page,
    size,
    sort,
    search: input
  }), [page, size, sort, input]);
  const { loading, data, fetchMore } = useQuery<QueryResponse>(QUERY, { variables });


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
      <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch" 
        maxWidth="xl" 
        spacing="4"
        style={{height: '95vh'}}
      >
        <Grid item xs={12} sm="auto">
          <Toggle 
            columnState={columnState}
            hangleToggle={handleToggleVisibility}
          />
        </Grid>
        <Grid 
          item 
          container 
          direction="column"
          justifyContent="flex-start"
          xs={12}
          sm
        >
          <Grid item xs>
            <Search
              handleSearch={setInput}
            />
          </Grid>
          <Grid item xs={11}>
            {loading ? 
                <Loading />
              :
              <DataGrid
                rows={data?.data.list || []}
                rowCount={data?.data.totalQuery || 0}
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
            }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
