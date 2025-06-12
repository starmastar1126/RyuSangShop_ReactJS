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

// ** Icons Imports
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpot } from 'src/store/basic/spot'
import { fetchCategory } from 'src/store/basic/category'
import { fetchUnit } from 'src/store/basic/unit'
import {
  fetchProduct,
  addProduct,
  editProduct,
  deleteProduct
} from 'src/store/basic/product'

// ** Custom Components Imports
import TableHeader from 'src/views/basic/product/TableHeader'

const schema = yup.object().shape({
  spot: yup.object().required('Spot is required'),
  category: yup.object().required('Category is required'),
  name: yup.string().required('Product Name is required'),
  cost: yup.number()
    .typeError('Cost must be a number')
    .positive('Cost must be greater than zero')
    .required('Cost is required'),
  price: yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .required('Price is required'),
  unit: yup.object().required('Unit is required'),
  note: yup.string()
})

/* eslint-enable */
const Product = () => {
  // ** State
  const [search, setSearch] = useState('')
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
      spot: null,
      category: null,
      name: '',
      cost: 0,
      price: 0,
      unit: null,
      note: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.product)
  const spots = useSelector(state => state.spot)
  const categories = useSelector(state => state.category)
  const units = useSelector(state => state.unit)

  useEffect(() => {
    dispatch(fetchSpot({ search: '' }))
    dispatch(fetchCategory({ search: '' }))
    dispatch(fetchUnit({ search: '' }))
  }, [])

  useEffect(() => {
    dispatch(fetchProduct({ search }))
  }, [dispatch, search])

  const handleCancel = () => {
    setSelected(null)
    setButton('Add')
    setCancel(false)
    reset({
      id: 0,
      spot: null,
      category: null,
      name: '',
      cost: 0,
      price: 0,
      unit: null,
      note: ''
    })
  }

  const onSubmit = data => {
    const { id, spot, category, name, cost, price, unit, note } = data

    if (spot && category && name && cost && price && unit) {
      const payload = {
        spotId: spot?.id || null,
        categoryId: category?.id || null,
        name,
        cost,
        price,
        unitId: unit?.id || null,
        note
      }

      if (!cancel)
        dispatch(addProduct(payload))
      else
        dispatch(editProduct({ id, ...payload }))

      setSearch('')
      handleCancel()
    }
  }

  const handleSearch = value => {
    setSearch(value)
  }

  const handleEdit = (product) => {
    handleCancel()
    setTimeout(() => {
      setSelected(product)
      setButton('Save')
      setCancel(true)

      reset({
        id: product.id,
        spot: {
          id: product.spotId,
          name: product.spotName
        },
        category: {
          id: product.categoryId,
          name: product.categoryName
        },
        name: product.name,
        cost: product.cost,
        price: product.price,
        unit: {
          id: product.unitId,
          name: product.unitName
        },
        note: product.note
      })
    }, 100)
  }

  const handleOpen = (product) => {
    setSelected(product)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    dispatch(deleteProduct({ id: selected.id, search }))
    setOpen(false)
    handleCancel()
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
      flex: 0.2,
      field: 'spot',
      headerName: 'Spot Name',
      renderCell: ({ row }) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.spotName}
        </Typography>
      )
    },
    {
      flex: 0.2,
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
      flex: 0.4,
      field: 'name',
      headerName: 'Product Name',
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
      flex: 0.2,
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
      sortable: false,
      field: 'actions',
      headerName: '@',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Edit Product'>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => handleEdit(row)}>
              <PencilOutline />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Product'>
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
            <CardHeader title='Manage Product' />
            <CardContent>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={2}>
                    <FormControl fullWidth>
                      <Controller
                        name='spot'
                        control={control}
                        render={({ field: { value, onChange, onBlur, ref } }) => (
                          <Autocomplete
                            size='small'
                            autoSelect
                            options={spots?.data || []}
                            getOptionLabel={option => option?.name || ''}
                            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                            value={value ?? null}
                            onChange={(e, newVal) => onChange(newVal ?? null)}
                            onBlur={() => {
                              if (!value || !spots.data.find(o => o.id === value.id)) {
                                onChange(null)
                              }
                              onBlur()
                            }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                inputRef={ref}
                                label='Spot'
                                placeholder='Select Spot'
                                error={Boolean(errors.spot)}
                              // helperText={errors.spot?.message}
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
                        name='category'
                        control={control}
                        render={({ field: { value, onChange, onBlur, ref } }) => (
                          <Autocomplete
                            size='small'
                            autoSelect
                            options={categories?.data || []}
                            getOptionLabel={option => option?.name || ''}
                            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                            value={value ?? null}
                            onChange={(e, newVal) => onChange(newVal ?? null)}
                            onBlur={() => {
                              if (!value || !categories.data.find(o => o.id === value.id)) {
                                onChange(null)
                              }
                              onBlur()
                            }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                inputRef={ref}
                                label='Category'
                                placeholder='Select Category'
                                error={Boolean(errors.category)}
                              // helperText={errors.category?.message}
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
                        name='name'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            size='small'
                            autoFocus
                            label='Product'
                            value={value}
                            placeholder='Enter Product'
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.name)}
                          // helperText={errors.name?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <FormControl fullWidth>
                      <Controller
                        name='cost'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            type='number'
                            inputMode='decimal'
                            label='Cost'
                            size='small'
                            value={value}
                            onBlur={onBlur}
                            onChange={(e) => onChange(parseFloat(e.target.value))}
                            placeholder='Enter Cost'
                            error={Boolean(errors.cost)}
                            // helperText={errors.cost?.message}
                            inputProps={{ min: '0.001', step: '0.1' }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <FormControl fullWidth>
                      <Controller
                        name='price'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            type='number'
                            inputMode='decimal'
                            label='Price'
                            size='small'
                            value={value}
                            onBlur={onBlur}
                            onChange={(e) => onChange(parseFloat(e.target.value))}
                            placeholder='Enter Price'
                            error={Boolean(errors.price)}
                            // helperText={errors.price?.message}
                            inputProps={{ min: '0.001', step: '0.1' }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <FormControl fullWidth>
                      <Controller
                        name='unit'
                        control={control}
                        render={({ field: { value, onChange, onBlur, ref } }) => (
                          <Autocomplete
                            size='small'
                            autoSelect
                            options={units?.data || []}
                            getOptionLabel={option => option?.name || ''}
                            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                            value={value ?? null}
                            onChange={(e, newVal) => onChange(newVal ?? null)}
                            onBlur={() => {
                              if (!value || !units.data.find(o => o.id === value.id)) {
                                onChange(null)
                              }
                              onBlur()
                            }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                inputRef={ref}
                                label='Unit'
                                placeholder='Select Unit'
                                error={Boolean(errors.unit)}
                              // helperText={errors.unit?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={1}>
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
            <TableHeader value={search} handleSearch={handleSearch} />
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
        <DialogTitle id='form-dialog-title'>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Really Delete This Product?
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

export default Product
