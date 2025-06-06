// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSpot,
  addSpot,
  editSpot,
  deleteSpot
} from 'src/store/basic/spot'

// ** Custom Components Imports
import TableHeader from 'src/views/basic/spot/TableHeader'

const schema = yup.object().shape({
  name: yup.string().min(1).required()
})

/* eslint-enable */
const Spot = () => {
  // ** State
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [selectedRows, setSelectedRows] = useState([])
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [button, setButton] = useState('Add')
  const [cancel, setCancel] = useState(false)

  // ** Vars
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: 0,
      name: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.spot)

  useEffect(() => {
    dispatch(fetchSpot({ search }))
  }, [dispatch, search])

  const handleCancel = () => {
    setSelected(null)
    setButton('Add')
    setCancel(false)
    reset({ id: 0, name: '' })
  }

  const onSubmit = data => {
    const { id, name } = data

    if (!cancel)
      dispatch(addSpot({ name }))
    else
      dispatch(editSpot({ id, name }))

    setSearch('')
    handleCancel()
  }

  const handleSearch = value => {
    setSearch(value)
  }

  const handleEdit = (one) => {
    setSelected(one)
    setButton('Save')
    setCancel(true)
    reset({ id: one.id, name: one.name })
  }

  const handleOpen = (one) => {
    setSelected(one)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    dispatch(deleteSpot({ id: selected.id, search }))
    setOpen(false)
    handleCancel()
  }

  const columns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 50,
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
      flex: 1.5,
      field: 'name',
      minWidth: 300,
      headerName: 'Spot Name',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: '@',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Edit Spot'>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => handleEdit(row)}>
              <PencilOutline />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Spot'>
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
            <CardHeader title='Manage Spot' />
            <CardContent>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='name'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            size='small'
                            autoFocus
                            value={value}
                            placeholder='Add Spot'
                            onBlur={onBlur}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} >
                    <Button size='middle' type='submit' variant='contained'>
                      {button}
                    </Button>
                    {cancel && (
                      <Button size='middle' type='submit' variant='outlined' sx={{ ml: 4 }} onClick={handleCancel}>
                        Cancel
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={search} selectedRows={selectedRows} handleSearch={handleSearch} />
            <DataGrid
              autoHeight
              pagination
              disableColumnMenu
              rows={store.data}
              columns={columns}
              pageSize={Number(pageSize)}
              rowsPerPageOptions={[10, 25, 50]}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              onSelectionModelChange={rows => setSelectedRows(rows)}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Delete Spot</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Really Delete This Spot?
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

export default Spot
