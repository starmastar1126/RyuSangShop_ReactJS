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
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Autocomplete from '@mui/material/Autocomplete'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icons Imports
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import format from 'date-fns/format'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from 'src/store/basic/product'
import {
  fetchInput,
  addInput,
  editInput,
  deleteInput
} from 'src/store/input'

// ** Custom Components Imports
import TableHeader from 'src/views/input/TableHeader'
import CustomInput from 'src/views/input/CustomInput'

const schema = yup.object().shape({
  date: yup.date().required(),
  // product: yup.object().required('Product is required'),
  quantity: yup.number().required()
    .typeError('Quantity must be a number')
    .positive('Quantity must be greater than zero')
    .required('Quantity is required'),
  note: yup.string()
})

/* eslint-enable */
const InputList = () => {
  // ** State
  const [search, setSearch] = useState('')
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [pageSize, setPageSize] = useState(10)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [button, setButton] = useState('Add')
  const [cancel, setCancel] = useState(false)
  const [current, setCurrent] = useState(new Date())

  // ** Vars
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: 0,
      date: current,
      product: null,
      quantity: 0,
      note: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.input)
  const products = useSelector(state => state.product)

  useEffect(() => {
    dispatch(fetchProduct({ search: '' }))
  }, [])

  useEffect(() => {
    dispatch(fetchInput({ fromDate, toDate, search }))
  }, [dispatch, fromDate, toDate, search])

  const handleDates = dates => {
    const [start, end] = dates
    setFromDate(start)
    setToDate(end)
  }

  const handleSearch = value => {
    setSearch(value)
  }

  const handleOpen = (input) => {
    setSelected(input)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    dispatch(deleteInput({ id: selected.id, fromDate, toDate, search }))
    setOpen(false)
    handleCancel()
  }

  const handleCancel = () => {
    setSelected(null)
    setButton('Add')
    setCancel(false)
    reset({
      id: 0,
      date: current,
      product: null,
      quantity: 0,
      note: ''
    })
  }

  const onSubmit = data => {
    const { id, date, product, quantity, note } = data
    setCurrent(date)

    if (date && product && quantity) {
      const payload = {
        date: format(date, 'yyyy-MM-dd'),
        productId: product?.id || null,
        quantity,
        note
      }

      if (!cancel)
        dispatch(addInput(payload))
      else
        dispatch(editInput({ id, ...payload }))

      setSearch('')
      handleCancel()
    }
  }

  const handleEdit = (input) => {
    handleCancel()
    setTimeout(() => {
      setSelected(input)
      setButton('Save')
      setCancel(true)
      reset({
        id: input.id,
        date: new Date(input.date),
        product: {
          id: input.productId,
          name: input.productName
        },
        quantity: input.quantity,
        note: input.note
      })
    }, 100)
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
    },
    {
      flex: 0.1,
      sortable: false,
      field: 'actions',
      headerName: '@',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Edit Input'>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => handleEdit(row)}>
              <PencilOutline />
            </IconButton>
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
          <Card sx={{ overflow: 'visible' }}>
            <CardHeader title='Manage Input' />
            <CardContent>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={2}>
                    <FormControl fullWidth>
                      <Controller
                        name='date'
                        control={control}
                        render={({ field: { value, onChange, onBlur, ref } }) => (
                          <DatePickerWrapper>
                            <DatePicker
                              selected={value}
                              id='date'
                              dateFormat='yyyy-MM-dd'
                              onChange={onChange}
                              onBlur={onBlur}
                              customInput={<CustomInput label='Date' />}
                            />
                          </DatePickerWrapper>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                      <Controller
                        name='product'
                        control={control}
                        render={({ field: { value, onChange, onBlur, ref } }) => (
                          <Autocomplete
                            size='small'
                            autoSelect
                            options={products?.data || []}
                            getOptionLabel={option => option?.name || ''}
                            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                            value={value ?? null}
                            onChange={(e, newVal) => onChange(newVal ?? null)}
                            onBlur={() => {
                              if (!value || !products.data.find(o => o.id === value.id)) {
                                onChange(null)
                              }
                              onBlur()
                            }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                inputRef={ref}
                                label='Product'
                                placeholder='Select Product'
                              />
                            )}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <FormControl fullWidth>
                      <Controller
                        name='quantity'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            label='Quantity'
                            size='small'
                            autoFocus
                            value={value}
                            placeholder='Enter Quantity'
                            onBlur={onBlur}
                            onChange={onChange}
                            onKeyDown={(e) => {
                              const allowedKeys = [
                                'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', '.', // allow decimal
                              ]
                              const isNumber = /^[0-9]$/.test(e.key)
                              if (!isNumber && !allowedKeys.includes(e.key)) {
                                e.preventDefault()
                              }
                            }}
                            error={Boolean(errors.quantity)}
                          />
                        )}
                      />
                      {errors.quantity && <FormHelperText sx={{ color: 'error.main' }}>{errors.quantity.message}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <FormControl fullWidth>
                      <Controller
                        name='note'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            size='small'
                            autoFocus
                            value={value}
                            placeholder='Enter Note'
                            onBlur={onBlur}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={2} >
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
            <TableHeader
              value={search}
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
