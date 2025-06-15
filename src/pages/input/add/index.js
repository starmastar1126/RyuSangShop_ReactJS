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
import { addInput } from 'src/store/input'

// ** Custom Components Imports
import TableHeader from 'src/views/input/add/TableHeader'
import CustomInput from 'src/views/input/list/CustomInput'

const schema = yup.object().shape({
  product: yup.object().required('Product is required'),
  quantity: yup.number().required('Quantity is required'),
  note: yup.string()
})

/* eslint-enable */
const InputAdd = () => {
  // ** State
  const [date, setDate] = useState(new Date())
  const [product, setProduct] = useState(null)
  const [data, setData] = useState([])
  const [pageSize, setPageSize] = useState(10)
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
      product: null,
      quantity: 0,
      note: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Hooks
  const dispatch = useDispatch()
  const products = useSelector(state => state.product)

  useEffect(() => {
    dispatch(fetchProduct({ search: '' }))
  }, [])

  const handleDate = date => {
    setDate(date)
  }

  const onSubmit = one => {
    const { id, product, quantity, note } = one

    if (product && quantity) {
      const payload = {
        id: cancel ? id : Math.random().toString(36).substring(2, 10),
        date: format(date, 'yyyy-MM-dd'),
        productId: product.id,
        productName: product.name,
        categoryId: product.categoryId,
        categoryName: product.categoryName,
        unitId: product.unitId,
        unitName: product.unitName,
        spotId: product.spotId,
        spotName: product.spotName,
        cost: product.cost,
        price: product.price,
        quantity,
        total: product.price * quantity,
        note,
        userName: window.localStorage.getItem('userData')?.name
      }

      if (!cancel)
        setData(prev => [...prev, payload])
      else
        setData(prev =>
          prev.map(item =>
            item.id === id ? { ...item, ...payload } : item
          )
        )

      handleCancel()
    }
  }

  const handleCancel = () => {
    setSelected(null)
    setProduct(null)
    setButton('Add')
    setCancel(false)
    reset({
      id: 0,
      product: null,
      quantity: 0,
      note: ''
    })
  }

  const handleEdit = (input) => {
    handleCancel()
    setTimeout(() => {
      setSelected(input)

      const found = products.data.find(item => item.id === input.productId)
      setProduct(found)
      setButton('Save')
      setCancel(true)
      reset({
        id: input.id,
        product: {
          id: input.productId,
          name: input.productName,
          categoryId: found.categoryId,
          categoryName: found.categoryName,
          unitId: found.unitId,
          unitName: found.unitName,
          spotId: found.spotId,
          spotName: found.spotName,
          cost: found.cost,
          price: found.price
        },
        quantity: input.quantity,
        note: input.note
      })
    }, 100)
  }

  const handleOpen = (input) => {
    setSelected(input)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    const filtered = data.filter(item => item.id !== selected.id)
    setData(filtered)
    setOpen(false)
    handleCancel()
  }

  const handleSave = () => {
    if (date && data.length > 0) {
      dispatch(addInput({ date: format(date, 'yyyy-MM-dd'), data }))
      window.location.href = '/input/list'
    }
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
              <Grid container spacing={5}>
                <Grid item xs={12} sm={2}>
                  <DatePickerWrapper>
                    <DatePicker
                      selected={date}
                      id='date'
                      dateFormat='yyyy-MM-dd'
                      onChange={handleDate}
                      customInput={<CustomInput label='Date' sx={{ mb: 5, width: '130px' }} />}
                    />
                  </DatePickerWrapper>
                </Grid>
              </Grid>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
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
                            onChange={(e, newVal) => {
                              onChange(newVal ?? null)
                              setProduct(newVal ?? null)
                            }}
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
                                error={Boolean(errors.product)}
                              // helperText={errors.product?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  {product && (
                    <>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          size='small'
                          value={product.categoryName || ''}
                          label='Category'
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={1}>
                        <TextField
                          size='small'
                          value={product.price ?? ''}
                          label='Price'
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={1}>
                        <TextField
                          size='small'
                          value={product.unitName || ''}
                          label='Unit'
                          disabled
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={1}>
                    <FormControl fullWidth>
                      <Controller
                        name='quantity'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            type='number'
                            inputMode='decimal'
                            label='Quantity'
                            size='small'
                            value={value}
                            onBlur={onBlur}
                            onChange={(e) => {
                              const val = e.target.value
                              // Allow empty string or negative numbers
                              onChange(val === '' ? '' : parseFloat(val))
                            }}
                            placeholder='Enter Quantity'
                            error={Boolean(errors.quantity)}
                            // helperText={errors.quantity?.message}
                            inputProps={{
                              step: '0.1',
                              inputMode: 'text', // <- Change this to text to allow minus
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <FormControl fullWidth>
                      <Controller
                        name='note'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            size='small'
                            autoFocus
                            label='Note'
                            value={value}
                            placeholder='Enter Note'
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.note)}
                          // helperText={errors.note?.message}
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
              handleSave={handleSave}
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

export default InputAdd
