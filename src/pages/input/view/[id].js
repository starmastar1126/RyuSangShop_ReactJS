// ** React Imports
import { useRouter } from 'next/router'
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { getInput } from 'src/store/input'

// ** Custom Components Imports
import TableHeader from 'src/views/input/view/TableHeader'

/* eslint-enable */
const InputView = () => {
  // ** State
  const [data, setData] = useState([])
  const [pageSize, setPageSize] = useState(10)

  // ** Hooks
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const items = useSelector(state => state.input)

  useEffect(() => {
    dispatch(getInput({ id }))
  }, [])

  useEffect(() => {
    setData(items?.data || [])
  }, [items])

  const handleBack = () => {
    window.location.href = '/input/list'
  }

  const columns = [
    {
      flex: 0.1,
      field: 'id',
      headerName: '#',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.id}
        </Typography>
      )
    },
    {
      flex: 0.15,
      field: 'date',
      headerName: 'Input Date',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.date}
        </Typography>
      )
    },
    {
      flex: 0.15,
      field: 'category',
      headerName: 'Category Name',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.categoryName}
        </Typography>
      )
    },
    {
      flex: 0.2,
      field: 'product',
      headerName: 'Product Name',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.productName}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'cost',
      headerName: 'Cost',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.cost}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'price',
      headerName: 'Price',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.price}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'quantity',
      headerName: 'Quantity',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.quantity}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'unit',
      headerName: 'Unit',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.unitName}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'total',
      headerName: 'Total',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.total}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'note',
      headerName: 'Note',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.note}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'username',
      headerName: 'Username',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.userName}
        </Typography>
      )
    }
  ]

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              handleBack={handleBack}
            />
            <DataGrid
              autoHeight
              pagination
              disableColumnMenu
              rows={data}
              columns={columns}
              pageSize={Number(pageSize)}
              rowsPerPageOptions={[10, 25, 50]}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default InputView
