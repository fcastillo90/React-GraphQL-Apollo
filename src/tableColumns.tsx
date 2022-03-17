import { Avatar } from "@mui/material"
import { GridRenderCellParams } from "@mui/x-data-grid";

export const columns = [
  { 
    field: 'id', 
    headerName: 'ID',
    visible: true
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    renderCell: (params: GridRenderCellParams<string>) => (
      <Avatar src={params.value} />
    ),
    visible: true
  },
  {
    field: 'first_name',
    headerName: 'First name',
    width: 150,
    visible: true
  },
  {
    field: 'last_name',
    headerName: 'Last name',
    width: 150,
    visible: true
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    visible: true
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 150,
    visible: true
  },
  {
    field: 'company_name',
    headerName: 'Company name',
    width: 250,
    visible: true
  },
  {
    field: 'job_title',
    headerName: 'Job title',
    width: 250,
    visible: true
  },
  {
    field: 'language',
    headerName: 'Language',
    width: 200,
    visible: true
  },
];

export default columns
