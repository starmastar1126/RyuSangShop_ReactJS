// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Third Party Imports
import { format } from 'date-fns'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchInput, deleteInput } from 'src/store/input'

// ** Custom Components Imports
import TableHeader from 'src/views/input/list/TableHeader'

/* eslint-enable */
const InputList = () => {
  // ** State
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [pageSize, setPageSize] = useState(10)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.input)

  useEffect(() => {
    dispatch(fetchInput({ fromDate, toDate }))
  }, [dispatch, fromDate, toDate])

  const handleDates = dates => {
    const [start, end] = dates
    setFromDate(start)
    setToDate(end)
  }

  const handleOpen = (input) => {
    setSelected(input)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    dispatch(deleteInput({
      id: selected.id,
      fromDate: format(fromDate, 'yyyy-MM-dd'),
      toDate: format(toDate, 'yyyy-MM-dd')
    }))
    setOpen(false)
    handleCancel()
  }

  const handleCancel = () => {
    setSelected(null)
  }

  const handleEdit = (input) => {
    handleCancel()
  }

  const handleSearch = value => {

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
      headerName: 'Ticket Date',
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
      flex: 0.5,
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
    },
    {
      flex: 0.1,
      sortable: false,
      field: 'actions',
      headerName: '@',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='View Input'>
            <Link href={`/input/view/${row.id}`} passHref>
              <IconButton size='small' sx={{ mr: 0.5 }}>
                <EyeOutline />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title='Edit Input'>
            <Link href={`/input/edit/${row.id}`} passHref>
              <IconButton size='small' sx={{ mr: 0.5 }}>
                <PencilOutline />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title='Delete Input'>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => handleOpen(row)}>
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              value={''}
              fromDate={fromDate}
              toDate={toDate}
              handleDates={handleDates}
              handleSearch={handleSearch}
            />
            <DataGrid
              autoHeight
              pagination
              disableColumnMenu
              rows={store.data}
              columns={columns}
              pageSize={Number(pageSize)}
              rowsPerPageOptions={[10, 25, 50]}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Delete Input</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Really Delete This Input?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default InputList
